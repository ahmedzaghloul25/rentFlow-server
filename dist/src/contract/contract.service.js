"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ContractService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const contract_repo_1 = require("../DB/repo/contract.repo");
const payment_repo_1 = require("../DB/repo/payment.repo");
let ContractService = ContractService_1 = class ContractService {
    contractRepo;
    paymentRepo;
    logger;
    cache;
    constructor(contractRepo, paymentRepo, logger, cache) {
        this.contractRepo = contractRepo;
        this.paymentRepo = paymentRepo;
        this.logger = logger;
        this.cache = cache;
    }
    async createNewContract(req, property, body) {
        try {
            if (!req.user._id.equals(property.user_id)) {
                throw new common_1.BadRequestException('UNAUTHORIZED_ACTION');
            }
            const validContract = await this.contractRepo.findOneRecord({
                property_id: property._id,
                end_date: { $gte: new Date() },
                actual_end_date: null,
                is_terminated: false
            });
            if (validContract) {
                throw new common_1.UnauthorizedException('ACTIVE_CONTRACT_FOUND');
            }
            if (body.end_date < body.start_date) {
                throw new common_1.ConflictException("INVALID_DATES");
            }
            const contract = await this.contractRepo.createNew({
                ...body,
                property_id: property._id,
                user_id: req.user._id,
            });
            await this.paymentRepo.createNew({
                contract_id: contract._id,
                user_id: req.user._id,
                due_date: contract.start_date,
                due_amount: contract.initial_rent
            });
            this.logger.log(`New contract ${contract._id} created successfully by user ${req.user._id}`, ContractService_1.name);
            return {
                message: 'Contract created successfully', contract: {
                    _id: contract._id,
                    end_date: contract.end_date,
                    start_date: contract.start_date,
                    property: contract.property_id,
                    client: contract.client_id,
                }
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error(`Failed to create contract for property ${property._id}`, error.stack, ContractService_1.name);
            throw new common_1.InternalServerErrorException('FAILED_TO_CREATE_CONTRACT');
        }
    }
    async terminateContract(req, contractId) {
        try {
            const contract = await this.contractRepo.findOneRecordAndUpdate({
                _id: contractId,
                is_terminated: false,
                user_id: req.user._id
            }, {
                is_terminated: true,
                actual_end_date: new Date()
            });
            if (!contract)
                throw new common_1.NotFoundException('CONTRACT_NOT_FOUND');
            await this.paymentRepo.updateManyRecord({
                contract_id: contract._id,
                is_paid: false,
            }, {
                is_cancelled: true
            });
            this.logger.warn(`Contract ${contract._id} was terminated successfully`, ContractService_1.name);
            await this.cache.del(`CONTRACTS_USER_${req.user._id}*`);
            await this.cache.del(`DASHBOARD_SUMMARY_USER_${req.user._id}`);
            await this.cache.del(`DASHBOARD_FINANCE_USER_${req.user._id}`);
            return {
                message: 'Contract terminated successfully', contract: {
                    _id: contract._id,
                    isTerminated: contract.is_terminated,
                    startDate: contract.start_date,
                    endDate: contract.end_date,
                    actualEndDate: contract.actual_end_date
                }
            };
        }
        catch (error) {
            this.logger.error(`Failed to terminate contract ${contractId}.`, error.stack, ContractService_1.name);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.InternalServerErrorException('FAILED_TO_TERMINATE_CONTRACT');
        }
    }
    async getAllContracts(req, filters, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const cleanedFilters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => {
                return value !== undefined &&
                    value !== null &&
                    value !== '';
            }));
            const cacheKey = `CONTRACTS_USER_${req.user._id}_PAGE_${page}_LIMIT_${limit}_FILTERS_${JSON.stringify(cleanedFilters)}`;
            const cachedContracts = await this.cache.get(cacheKey);
            if (!cachedContracts) {
                const contracts = await this.contractRepo.findAllRecords({
                    user_id: req.user._id,
                    ...(cleanedFilters)
                }, {}, skip, limit, ['property_id', 'client_id']);
                if (!contracts.length)
                    throw new common_1.NotFoundException('CONTRACTS_NOT_FOUND');
                const totalCount = await this.contractRepo.countRecords({ user_id: req.user._id, ...(cleanedFilters) });
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
                await this.cache.set(cacheKey, result);
                return result;
            }
            return cachedContracts;
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error(`Failed to get All contracts for user ${req.user._id}`, error.stack, ContractService_1.name);
            throw new common_1.InternalServerErrorException('FAILED_TO_GET_CONTRACTS');
        }
    }
    async getContract(req, contractId) {
        try {
            const cacheKey = `CONTRACT_${contractId}_USER_${req.user._id.toHexString()}`;
            const cachedContract = await this.cache.get(cacheKey);
            if (!cachedContract) {
                const contract = await this.contractRepo.findOneRecord({ _id: contractId }, ['property_id']);
                if (!contract || !contract.user_id.equals(req.user._id)) {
                    throw new common_1.BadRequestException('BAD_REQUEST');
                }
                await this.cache.set(cacheKey, contract);
                return { message: 'Contract fetched successfully', contract };
            }
            return { message: 'Contract fetched successfully', contract: cachedContract };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error(`Failed to get contract ${contractId}`, error.stack, ContractService_1.name);
        }
    }
};
exports.ContractService = ContractService;
exports.ContractService = ContractService = ContractService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [contract_repo_1.ContractRepo,
        payment_repo_1.PaymentRepo,
        common_2.Logger, Object])
], ContractService);
//# sourceMappingURL=contract.service.js.map