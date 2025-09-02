import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { APP_CONSTANTS } from "common/constants";
import { ContractRepo, PaymentRepo } from "src/DB/repo";
import { ContractDoc, PaymentDoc } from "src/DB/schema";


@Injectable()
export class Schedulers {
    constructor(private readonly contractRepo: ContractRepo,
        private logger: Logger,
        private readonly paymentRepo: PaymentRepo
    ) { }

    private calculateMonthsDifference(startDate: Date, endDate: Date): number {
        const startYear = startDate.getFullYear();
        const startMonth = startDate.getMonth();
        const endYear = endDate.getFullYear();
        const endMonth = endDate.getMonth();
        return (endYear - startYear) * 12 + (endMonth - startMonth);
    }
    private addMonthsToDate(date: Date, months: number): Date {
        const newDate = new Date(date);
        const newMonth = newDate.getMonth() + months;
        newDate.setMonth(newMonth);
        // Handle month overflow (e.g., adding months to Jan 31 might result in invalid dates)
        if (newDate.getMonth() !== (newMonth % 12)) {
            // Set to last day of the intended month
            newDate.setDate(0);
        }
        return newDate;
    }
    /**
     * cron job to terminate contracts that expired on end_date
     * starts at 2 AM on day 1 and 15 of every month 
     */
    @Cron('0 2 1,15 * *', {
        timeZone: APP_CONSTANTS.TIME_ZONE,
        name: 'contract-auto-terminate'
    })
    async autoTerminateContracts() {
        this.logger.log(`Starting contracts auto-termination job...`, Schedulers.name)
        const expiredContracts = await this.contractRepo.updateManyRecord({
            end_date: { $lt: new Date() },
            is_terminated: { $exists: false },
            actual_end_date: null
        },
            {
                is_terminated: true,
            }
        )
        this.logger.log(`{${expiredContracts.modifiedCount}} contracts have been terminated by the system.`, Schedulers.name)
    }
    /**
     * cron job to add payment records for newly created contracts
     * starting from second payment
     */
    @Cron('0 2 * * *', {
        timeZone: APP_CONSTANTS.TIME_ZONE,
        name: 'payment-auto-create'
    })
    async autoCreateRemainingPayments() {
        this.logger.log('Starting remaining payments auto-creation job...', Schedulers.name);
        // Find contracts that have first payment but not all payments created
        const contracts = await this.contractRepo.findAllRecords({
            start_date: { $gte: new Date() },
            isPaymentsCreated: false
        }) as ContractDoc[];
        if (!contracts || contracts.length === 0) {
            this.logger.log('No contracts found for remaining payment creation', Schedulers.name);
            return;
        }
        this.logger.log(`Found ${contracts.length} contracts to process`, Schedulers.name);
        for (const contract of contracts) {
            try {
                // Check if first payment already exists
                const existingPayments = await this.paymentRepo.countRecords({
                    contract_id: contract._id
                });
                if (existingPayments === 0) {
                    this.logger.warn(`Contract ${contract._id} has no payments - skipping`, Schedulers.name);
                    continue;
                }
                const paymentInterval = contract.payment_interval; // PaymentInterval enum values
                const annualIncrease = contract.annual_increase || 0;
                const baseAmount = contract.initial_rent || 0;
                // Calculate total months between start and end date
                const totalMonths = this.calculateMonthsDifference(contract.start_date, contract.end_date);
                // Calculate total number of payments needed
                const totalPayments = Math.ceil(totalMonths / paymentInterval);
                if (existingPayments >= totalPayments) {
                    // All payments already created
                    await this.contractRepo.updateOneRecord(
                        { _id: contract._id },
                        { isPaymentsCreated: true }
                    );
                    continue;
                }
                this.logger.log(`Contract ${contract._id}: Creating ${totalPayments - existingPayments} remaining payments`, Schedulers.name);
                const payments: Partial<PaymentDoc>[] = [];
                // Start from payment 2 (skip first payment)
                for (let paymentIndex = existingPayments; paymentIndex < totalPayments; paymentIndex++) {
                    // Calculate due date
                    const monthsToAdd = paymentIndex * paymentInterval;
                    const dueDate = this.addMonthsToDate(contract.start_date, monthsToAdd);
                    // Apply annual increase if applicable
                    const yearsElapsed = Math.floor(monthsToAdd / 12);
                    const adjustedAmount = baseAmount * Math.pow(1 + (annualIncrease / 100), yearsElapsed);
                    const paymentRecord = {
                        contract_id: contract._id,
                        due_date: dueDate,
                        due_amount: Math.round(adjustedAmount * 100) / 100, // Round to 2 decimal places
                        is_paid: false
                    };
                    payments.push(paymentRecord)
                }
                // Save remaining payment records
                if (payments.length > 0) {
                    await this.paymentRepo.createNew(payments);
                }
                // Mark contract as all payments created
                await this.contractRepo.updateOneRecord(
                    { _id: contract._id },
                    { isPaymentsCreated: true }
                );
                this.logger.log(`Created ${payments.length} remaining payment records for contract ${contract._id}`, Schedulers.name);
            } catch (error) {
                this.logger.error(`Error processing contract ${contract._id}:`, error, Schedulers.name);
                // Continue with next contract even if one fails
            }
        }
        this.logger.log('Remaining payments auto-creation job completed', Schedulers.name);
    }
}