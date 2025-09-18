import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { _Request } from '../../common/types/types';
import { Types } from 'mongoose';
import { ContractRepo } from '../DB/repo/contractRepo';
import { PaymentRepo } from '../DB/repo/paymentRepo';

@Injectable()
export class DashboardService {
    constructor(
        private readonly contractRepo: ContractRepo,
        private readonly paymentRepo: PaymentRepo,
        @Inject(CACHE_MANAGER) private cache: Cache,
        private logger: Logger
    ) { }

    /**
     * get due payment for a contract
     * @param req express request containing user information
     * @returns due payment for each active contract
     */
    async getDuePayment(req: _Request) {
        try {
            const cacheKey = `DASHBOARD_SUMMARY_USER_${req.user._id}`
            const cachedContracts = await this.cache.get(cacheKey)
            if (!cachedContracts) {
                const contracts = await this.contractRepo.findAllRecords(
                    { is_terminated: false, user_id: req.user._id },
                    {},
                    0,
                    500,
                    ['property_id', 'client_id'],
                    { 'createdAt': 1 }
                )
                if (!contracts.length) throw new NotFoundException('PROPERTIES_NOT_FOUND')
                const duePayments = await this.paymentRepo.aggregate([
                    {
                        $match: {
                            user_id: new Types.ObjectId(req.user._id),
                            is_paid: false
                        }
                    },
                    {
                        $sort: {
                            due_date: 1
                        }
                    },
                    {
                        $group: {
                            _id: '$contract_id',
                            duePayment: { $first: '$$ROOT' },
                        }
                    },
                ])
                const result = { contracts, duePayments }
                await this.cache.set(cacheKey, result)
                return result
            }
            return cachedContracts
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error(`Failed to get all Contracts`, error.stack, DashboardService.name)
            throw new InternalServerErrorException('FAILED_TO-GET_ALL_CONTRACTS')
        }
    }
    /**
     * get financial data for each active contract
     * @param req express request containing user information
     * @returns object containing financial data for each contract
     */
    async getFinancialData(req: _Request) {
        try {
            const cacheKey = `DASHBOARD_FINANCE_USER_${req.user._id}`;
            const cachedData = await this.cache.get(cacheKey);
            if (cachedData) {
                return cachedData;
            }
            const financialData = await this.paymentRepo.aggregate([
                {
                    $match: {
                        user_id: new Types.ObjectId(req.user._id)
                    }
                },
                {
                    $group: {
                        _id: '$contract_id',
                        totalRevenue: {
                            $sum: {
                                $cond: [{ $ne: ["$is_cancelled", true] }, "$due_amount", 0]
                            }
                        },
                        totalReceived: {
                            $sum: {
                                $cond: [{ $and: [{ $eq: ["$is_paid", true] }, { $ne: ["$is_cancelled", true] }] }, "$amount_paid", 0]
                            }
                        },
                        totalDue: {
                            $sum: {
                                $cond: [{ $and: [{ $eq: ["$is_paid", false] }, { $ne: ["$is_cancelled", true] }] }, "$due_amount", 0]
                            }
                        }
                    }
                },
                {
                    $lookup: { from: 'contracts', localField: '_id', foreignField: '_id', as: 'contract' }
                },
                { $unwind: '$contract' },
                {
                    $lookup: { from: 'properties', localField: 'contract.property_id', foreignField: '_id', as: 'property' }
                },
                { $unwind: '$property' }
            ]);
            await this.cache.set(cacheKey, financialData);
            return financialData;
        } catch (error) {
            this.logger.error(`Failed to get financial data`, error.stack, DashboardService.name);
            throw new InternalServerErrorException('FAILED_TO_GET_FINANCIAL_DATA');
        }
    }
}
