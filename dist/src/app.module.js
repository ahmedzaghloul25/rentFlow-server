"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const property_module_1 = require("./property/property.module");
const client_module_1 = require("./client/client.module");
const cache_manager_1 = require("@nestjs/cache-manager");
const contract_module_1 = require("./contract/contract.module");
const payment_module_1 = require("./payment/payment.module");
const constants_1 = require("../common/constants");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const core_1 = require("@nestjs/core");
const guards_1 = require("../common/guards");
const cron_module_1 = require("./cron/cron.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: "./.env",
                isGlobal: true
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('DB_ONLINE')
                }),
                inject: [config_1.ConfigService]
            }),
            cache_manager_1.CacheModule.register({ ttl: constants_1.APP_CONSTANTS.CACHE_TTL, isGlobal: true }),
            auth_module_1.AuthModule,
            property_module_1.PropertyModule,
            client_module_1.ClientModule,
            contract_module_1.ContractModule,
            payment_module_1.PaymentModule,
            dashboard_module_1.DashboardModule,
            cron_module_1.CronModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, { provide: core_1.APP_GUARD, useClass: guards_1.ValidateCsrf }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map