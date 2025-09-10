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
var Schedulers_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedulers = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const constants_1 = require("../constants");
const repo_1 = require("../../src/DB/repo");
let Schedulers = Schedulers_1 = class Schedulers {
    contractRepo;
    logger;
    paymentRepo;
    constructor(contractRepo, logger, paymentRepo) {
        this.contractRepo = contractRepo;
        this.logger = logger;
        this.paymentRepo = paymentRepo;
    }
    calculateMonthsDifference(startDate, endDate) {
        const startYear = startDate.getFullYear();
        const startMonth = startDate.getMonth();
        const endYear = endDate.getFullYear();
        const endMonth = endDate.getMonth();
        return (endYear - startYear) * 12 + (endMonth - startMonth);
    }
    addMonthsToDate(date, months) {
        const newDate = new Date(date);
        const newMonth = newDate.getMonth() + months;
        newDate.setMonth(newMonth);
        if (newDate.getMonth() !== (newMonth % 12)) {
            newDate.setDate(0);
        }
        return newDate;
    }
    async autoTerminateContracts() {
        this.logger.log(`Starting contracts auto-termination job...`, Schedulers_1.name);
        const expiredContracts = await this.contractRepo.updateManyRecord({
            end_date: { $lt: new Date() },
            is_terminated: { $exists: false },
            actual_end_date: null
        }, {
            is_terminated: true,
        });
        this.logger.log(`{${expiredContracts.modifiedCount}} contracts have been terminated by the system.`, Schedulers_1.name);
    }
    async autoCreateRemainingPayments() {
        this.logger.log('Starting remaining payments auto-creation job...', Schedulers_1.name);
        const contracts = await this.contractRepo.findAllRecords({
            isPaymentsCreated: false,
            is_terminated: false
        });
        if (!contracts || contracts.length === 0) {
            this.logger.log('No contracts found for remaining payment creation', Schedulers_1.name);
            return;
        }
        this.logger.log(`Found ${contracts.length} contracts to process`, Schedulers_1.name);
        for (const contract of contracts) {
            try {
                const existingPayments = await this.paymentRepo.countRecords({
                    contract_id: contract._id
                });
                if (existingPayments === 0) {
                    this.logger.warn(`Contract ${contract._id} has no payments - skipping`, Schedulers_1.name);
                    continue;
                }
                const paymentInterval = contract.payment_interval;
                const annualIncrease = contract.annual_increase || 0;
                const baseAmount = contract.initial_rent || 0;
                const totalMonths = this.calculateMonthsDifference(contract.start_date, contract.end_date);
                const totalPayments = Math.ceil(totalMonths / paymentInterval);
                if (existingPayments >= totalPayments) {
                    await this.contractRepo.updateOneRecord({ _id: contract._id }, { isPaymentsCreated: true });
                    continue;
                }
                this.logger.log(`Contract ${contract._id}: Creating ${totalPayments - existingPayments} remaining payments`, Schedulers_1.name);
                const payments = [];
                for (let paymentIndex = existingPayments; paymentIndex < totalPayments; paymentIndex++) {
                    const monthsToAdd = paymentIndex * paymentInterval;
                    const dueDate = this.addMonthsToDate(contract.start_date, monthsToAdd);
                    const yearsElapsed = Math.floor(monthsToAdd / 12);
                    const adjustedAmount = baseAmount * Math.pow(1 + (annualIncrease / 100), yearsElapsed);
                    const paymentRecord = {
                        contract_id: contract._id,
                        user_id: contract.user_id,
                        due_date: dueDate,
                        due_amount: Math.round(adjustedAmount * 100) / 100,
                        is_paid: false
                    };
                    payments.push(paymentRecord);
                }
                if (payments.length > 0) {
                    await this.paymentRepo.createNew(payments);
                }
                await this.contractRepo.updateOneRecord({ _id: contract._id }, { isPaymentsCreated: true });
                this.logger.log(`Created ${payments.length} remaining payment records for contract ${contract._id}`, Schedulers_1.name);
            }
            catch (error) {
                this.logger.error(`Error processing contract ${contract._id}:`, error, Schedulers_1.name);
            }
        }
        this.logger.log('Remaining payments auto-creation job completed', Schedulers_1.name);
    }
};
exports.Schedulers = Schedulers;
__decorate([
    (0, schedule_1.Cron)('0 2 1,15 * *', {
        timeZone: constants_1.APP_CONSTANTS.TIME_ZONE,
        name: 'contract-auto-terminate'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Schedulers.prototype, "autoTerminateContracts", null);
__decorate([
    (0, schedule_1.Cron)('0 2 * * *', {
        timeZone: constants_1.APP_CONSTANTS.TIME_ZONE,
        name: 'payment-auto-create'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Schedulers.prototype, "autoCreateRemainingPayments", null);
exports.Schedulers = Schedulers = Schedulers_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repo_1.ContractRepo,
        common_1.Logger,
        repo_1.PaymentRepo])
], Schedulers);
//# sourceMappingURL=schedulers.js.map