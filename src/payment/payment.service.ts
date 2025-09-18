import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { _Request, PopulatedPayment } from '../../common/types/types';
import { PaymentRepo } from 'src/DB/repo/paymentRepo';
import { MarkPaymentPaidDto, PaymentsQueryFilter } from './DTO';
import { Types } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class PaymentService {
    constructor(private readonly paymentRepo: PaymentRepo,
        private logger: Logger,
        @Inject(CACHE_MANAGER) private cache: Cache
    ) { }
    /**
     * mark payment as paid
     * @param paymentId - the ID of payment
     * @param req - express request containing the user object
     * @param body - the payment information
     * @returns - object containing message and marked payment
     */
    async markPaymentPaid(paymentId: string, req: _Request, body: MarkPaymentPaidDto) {
        try {
            const payment = await this.paymentRepo.findOneRecord(
                {
                    _id: paymentId,
                    is_paid: false,
                    is_cancelled: { $exists: false }
                }, ['contract_id']
            ) as PopulatedPayment | null
            if (!payment || !payment.contract_id.user_id.equals(req.user._id)) {
                throw new BadRequestException('INVALID_PAYMENT_ID')
            }
            if (body.amount_paid !== payment.due_amount) {
                throw new BadRequestException("INVALID_AMOUNT_PAID")
            }
            const result = await this.paymentRepo.findOneRecordAndUpdate(
                { _id: payment._id },
                {
                    is_paid: true,
                    ...body
                }
            )
            return { message: 'Payment added successfully', payment: result }
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error('Failed to mark payment as received', error.stack, PaymentService.name)
            throw new InternalServerErrorException('PAYMENT_MARK_FAILED')
        }
    }
    /**
     * get payment records for a contract
     * @param contractId - the ID for a contract
     * @param req - express request with user information
     * @param filters - query filtration 
     * @returns object containing message, pagination object and payments
     */
    async getContractPayments(contractId: string, req: _Request, filters: PaymentsQueryFilter) {
        try {
            const { page = 1, limit = 10, ...filter } = filters
            const cleanedFilters = Object.fromEntries(
                Object.entries(filter).filter(([_, value]) => {
                    return value !== undefined &&
                        value !== null
                })
            )
            const cacheKey = `PAYMENTS_USER_${req.user._id}_CONTRACT_${contractId}_PAGE_${page}_LIMIT_${limit}_FILTERS_${JSON.stringify(cleanedFilters)}`
            const cachedPayments = await this.cache.get(cacheKey)
            if (!cachedPayments) {
                // const paymentCheck = await this.paymentRepo.findOneRecord(
                //     { contract_id: new Types.ObjectId(contractId), ...(cleanedFilters) },
                //     ['contract_id']
                // ) as PopulatedPayment | null
                // if (!paymentCheck || !paymentCheck.contract_id.user_id.equals(req.user._id)) {
                //     throw new UnauthorizedException('UNAUTHORIZED_ACTION')
                // }
                const skip = (page - 1) * limit
                const payments = await this.paymentRepo.findAllRecords(
                    {
                        contract_id: new Types.ObjectId(contractId),
                        user_id: req.user._id,
                        ...(cleanedFilters)
                    },
                    {},
                    skip,
                    limit,
                    ['contract_id'],
                    { 'due_date': 1 }
                )
                if (!payments.length) throw new NotFoundException('PAYMENT_RECORDS_NOT_FOUND')
                const totalCount = await this.paymentRepo.countRecords({
                    contract_id: new Types.ObjectId(contractId),
                    user_id: req.user._id,
                    ...(cleanedFilters)
                })
                const result = {
                    message: 'Payments fetched successfully',
                    pagination: {
                        totalRecords: totalCount,
                        page,
                        limit,
                        totalPages: Math.ceil(totalCount / limit)
                    },
                    payments
                }
                await this.cache.set(cacheKey, result)
                return result
            }
            return cachedPayments
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error('Failed to get contract payments', error.stack, PaymentService.name)
            throw new InternalServerErrorException('FAILED_TO_GET_PAYMENTS')
        }
    }
}
