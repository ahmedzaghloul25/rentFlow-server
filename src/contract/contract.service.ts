import {
    BadRequestException,
    ConflictException,
    HttpException,
    Inject, Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { _Request } from 'common/types';
import { Types } from 'mongoose';
import { ContractRepo, PaymentRepo } from 'src/DB/repo';
import { ContractDoc, PropertyDoc } from 'src/DB/schema';
import { Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateNewContract } from './DTO';
import type { Cache } from 'cache-manager';

@Injectable()
export class ContractService {
    constructor(private readonly contractRepo: ContractRepo,
        private readonly paymentRepo: PaymentRepo,
        private logger: Logger,
        @Inject(CACHE_MANAGER) private cache: Cache
    ) { }

    /**
     * create new contract for property
     * @param req - express request containing user details
     * @param property - property object to be rented
     * @param client - client object who will rent the property
     * @param body - contract information
     * @returns - object containing message with created contract
     */
    async createNewContract(req: _Request, property: PropertyDoc, body: CreateNewContract) {
        try {
            if (!req.user._id.equals(property.user_id)) {
                throw new BadRequestException('UNAUTHORIZED_ACTION')
            }
            const validContract = await this.contractRepo.findOneRecord({
                property_id: property._id,
                end_date: { $gte: new Date() },
                actual_end_date: null,
                is_terminated: { $exists: false }
            })
            if (validContract) {
                throw new UnauthorizedException('ACTIVE_CONTRACT_FOUND')
            }
            if (body.end_date < body.start_date) {
                throw new ConflictException("INVALID_DATES")
            }
            const contract = await this.contractRepo.createNew({
                ...body,
                property_id: property._id,
                user_id: req.user._id,
            }) as ContractDoc
            await this.paymentRepo.createNew({
                contract_id: contract._id,
                due_date: contract.start_date,
                due_amount: contract.initial_rent
            })

            this.logger.log(`New contract ${contract._id} created successfully by user ${req.user._id}`, ContractService.name)
            return {
                message: 'Contract created successfully', contract: {
                    _id: contract._id,
                    end_date: contract.end_date,
                    start_date: contract.start_date,
                    property: contract.property_id,
                    client: contract.client_id,
                }
            }
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error(`Failed to create contract for property ${property._id}`, error.stack, ContractService.name)
            throw new InternalServerErrorException('FAILED_TO_CREATE_CONTRACT')
        }
    }
    /**
     * terminate contract before end time
     * @param req - express request containing user details
     * @param contractId - the ID for the contract
     * @returns - object containing message and terminated contract
     */
    async terminateContract(req: _Request, contractId: string) {
        try {
            const contract = await this.contractRepo.findOneRecordAndUpdate(
                {
                    _id: contractId,
                    is_terminated: { $exists: false },
                    user_id: req.user._id
                },
                {
                    is_terminated: true,
                    actual_end_date: new Date()
                }
            )
            if (!contract) throw new NotFoundException('CONTRACT_NOT_FOUND')
            await this.paymentRepo.updateManyRecord(
                {
                    contract_id: contract._id,
                    is_paid: false,
                },
                {
                    is_cancelled: true
                }
            )
            this.logger.warn(`Contract ${contract._id} was terminated successfully`, ContractService.name)
            return {
                message: 'Contract terminated successfully', contract: {
                    _id: contract._id,
                    isTerminated: contract.is_terminated,
                    startDate: contract.start_date,
                    endDate: contract.end_date,
                    actualEndDate: contract.actual_end_date
                }
            }
        } catch (error) {
            this.logger.error(`Failed to terminate contract ${contractId}.`, error.stack, ContractService.name)
            if (error instanceof HttpException) throw error
            throw new InternalServerErrorException('FAILED_TO_TERMINATE_CONTRACT')
        }
    }
    /**
     * get all contracts
     * @param req - express request containing user details
     * @param filters - filters options for query
     * @param page - page number
     * @param limit - limit per page
     * @returns - found contracts and pagination details
     */
    async getAllContracts(req: _Request, filters?: any, page: number = 1, limit: number = 10) {
        try {
            const skip = (page - 1) * limit
            const cleanedFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, value]) => {
                    return value !== undefined &&
                        value !== null &&
                        value !== ''
                }))
            const cacheKey = `CONTRACTS_USER_${req.user._id}_PAGE_${page}_LIMIT_${limit}_FILTERS_${JSON.stringify(cleanedFilters)}`
            const cachedContracts = await this.cache.get(cacheKey)
            if (!cachedContracts) {
                const contracts = await this.contractRepo.findAllRecords(
                    {
                        user_id: req.user._id,
                        ...(cleanedFilters)
                    },
                    {},
                    skip,
                    limit
                )
                if (!contracts.length) throw new NotFoundException('CONTRACTS_NOT_FOUND')
                const totalCount = await this.contractRepo.countRecords({ user_id: req.user._id, ...(cleanedFilters) })
                const result = {
                    message: "Contracts fetched successfully",
                    pagination: {
                        totalRecords: totalCount,
                        page,
                        limit,
                        totalPages: Math.ceil(totalCount / limit)
                    },
                    contracts
                };
                await this.cache.set(cacheKey, result)
                return result
            }
            return cachedContracts
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error(`Failed to get All contracts for user ${req.user._id}`, error.stack, ContractService.name)
            throw new InternalServerErrorException('FAILED_TO_GET_CONTRACTS')
        }
    }
    /**
     * get contract
     * @param req - express request containing user details
     * @param contractId - the ID for contract 
     * @returns - object containing message and contract
     */
    async getContract(req: _Request, contractId: string) {
        try {
            const cacheKey = `CONTRACT_${contractId}_USER_${req.user._id.toHexString()}`
            const cachedContract = await this.cache.get(cacheKey)

            if (!cachedContract) {
                const contract = await this.contractRepo.findOneRecord({ _id: contractId })
                if (!contract || !contract.user_id.equals(req.user._id)) {
                    throw new BadRequestException('BAD_REQUEST')
                }
                await this.cache.set(cacheKey, contract)
                return { message: 'Contract fetched successfully', contract }
            }
            return { message: 'Contract fetched successfully', contract: cachedContract }
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error(`Failed to get contract ${contractId}`, error.stack, ContractService.name)
        }
    }
}
