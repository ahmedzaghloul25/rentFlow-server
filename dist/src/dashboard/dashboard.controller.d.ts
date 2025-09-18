import { DashboardService } from './dashboard.service';
import type { _Request } from '../../common/types/types';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDuePayment(req: _Request): Promise<{}>;
    getFinancialData(req: _Request): Promise<{}>;
}
