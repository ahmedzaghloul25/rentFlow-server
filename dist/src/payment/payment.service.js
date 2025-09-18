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
var PaymentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const payment_repo_1 = require("../DB/repo/payment.repo");
const mongoose_1 = require("mongoose");
const cache_manager_1 = require("@nestjs/cache-manager");
let PaymentService = PaymentService_1 = class PaymentService {
    paymentRepo;
    logger;
    cache;
    constructor(paymentRepo, logger, cache) {
        this.paymentRepo = paymentRepo;
        this.logger = logger;
        this.cache = cache;
    }
    async markPaymentPaid(paymentId, req, body) {
        try {
            const payment = await this.paymentRepo.findOneRecord({
                _id: paymentId,
                is_paid: false,
                is_cancelled: { $exists: false }
            }, ['contract_id']);
            if (!payment || !payment.contract_id.user_id.equals(req.user._id)) {
                throw new common_1.BadRequestException('INVALID_PAYMENT_ID');
            }
            if (body.amount_paid !== payment.due_amount) {
                throw new common_1.BadRequestException("INVALID_AMOUNT_PAID");
            }
            const result = await this.paymentRepo.findOneRecordAndUpdate({ _id: payment._id }, {
                is_paid: true,
                ...body
            });
            return { message: 'Payment added successfully', payment: result };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error('Failed to mark payment as received', error.stack, PaymentService_1.name);
            throw new common_1.InternalServerErrorException('PAYMENT_MARK_FAILED');
        }
    }
    async getContractPayments(contractId, req, filters) {
        try {
            const { page = 1, limit = 10, ...filter } = filters;
            const cleanedFilters = Object.fromEntries(Object.entries(filter).filter(([_, value]) => {
                return value !== undefined &&
                    value !== null;
            }));
            const cacheKey = `PAYMENTS_USER_${req.user._id}_CONTRACT_${contractId}_PAGE_${page}_LIMIT_${limit}_FILTERS_${JSON.stringify(cleanedFilters)}`;
            const cachedPayments = await this.cache.get(cacheKey);
            if (!cachedPayments) {
                const skip = (page - 1) * limit;
                const payments = await this.paymentRepo.findAllRecords({
                    contract_id: new mongoose_1.Types.ObjectId(contractId),
                    user_id: req.user._id,
                    ...(cleanedFilters)
                }, {}, skip, limit, ['contract_id'], { 'due_date': 1 });
                if (!payments.length)
                    throw new common_1.NotFoundException('PAYMENT_RECORDS_NOT_FOUND');
                const totalCount = await this.paymentRepo.countRecords({
                    contract_id: new mongoose_1.Types.ObjectId(contractId),
                    user_id: req.user._id,
                    ...(cleanedFilters)
                });
                const result = {
                    message: 'Payments fetched successfully',
                    pagination: {
                        totalRecords: totalCount,
                        page,
                        limit,
                        totalPages: Math.ceil(totalCount / limit)
                    },
                    payments
                };
                await this.cache.set(cacheKey, result);
                return result;
            }
            return cachedPayments;
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error('Failed to get contract payments', error.stack, PaymentService_1.name);
            throw new common_1.InternalServerErrorException('FAILED_TO_GET_PAYMENTS');
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = PaymentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [payment_repo_1.PaymentRepo,
        common_1.Logger, Object])
], PaymentService);
//# sourceMappingURL=payment.service.js.map