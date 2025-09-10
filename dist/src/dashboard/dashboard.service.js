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
var DashboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const repo_1 = require("../DB/repo");
let DashboardService = DashboardService_1 = class DashboardService {
    contractRepo;
    paymentRepo;
    cache;
    logger;
    constructor(contractRepo, paymentRepo, cache, logger) {
        this.contractRepo = contractRepo;
        this.paymentRepo = paymentRepo;
        this.cache = cache;
        this.logger = logger;
    }
    async getDuePayment(req) {
        try {
            const cacheKey = `DASHBOARD_SUMMARY_USER_${req.user._id}`;
            const cachedContracts = await this.cache.get(cacheKey);
            if (!cachedContracts) {
                const contracts = await this.contractRepo.findAllRecords({ is_terminated: false, user_id: req.user._id }, {}, 0, 500, ['property_id', 'client_id'], { 'createdAt': 1 });
                if (!contracts.length)
                    throw new common_1.NotFoundException('PROPERTIES_NOT_FOUND');
                const duePayments = await this.paymentRepo.aggregate([
                    {
                        $match: {
                            user_id: new mongoose_1.Types.ObjectId(req.user._id),
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
                ]);
                const result = { contracts, duePayments };
                await this.cache.set(cacheKey, result);
                return result;
            }
            return cachedContracts;
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error(`Failed to get all Contracts`, error.stack, DashboardService_1.name);
            throw new common_1.InternalServerErrorException('FAILED_TO-GET_ALL_CONTRACTS');
        }
    }
    async getFinancialData(req) {
        try {
            const cacheKey = `DASHBOARD_FINANCE_USER_${req.user._id}`;
            const cachedData = await this.cache.get(cacheKey);
            if (cachedData) {
                return cachedData;
            }
            const financialData = await this.paymentRepo.aggregate([
                {
                    $match: {
                        user_id: new mongoose_1.Types.ObjectId(req.user._id)
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
        }
        catch (error) {
            this.logger.error(`Failed to get financial data`, error.stack, DashboardService_1.name);
            throw new common_1.InternalServerErrorException('FAILED_TO_GET_FINANCIAL_DATA');
        }
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = DashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [repo_1.ContractRepo,
        repo_1.PaymentRepo, Object, common_1.Logger])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map