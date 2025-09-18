"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModule = void 0;
const common_1 = require("@nestjs/common");
const client_controller_1 = require("./client.controller");
const client_service_1 = require("./client.service");
const client_schema_1 = require("../DB/schema/client.schema");
const user_schema_1 = require("../DB/schema/user.schema");
const contract_schema_1 = require("../DB/schema/contract.schema");
const jwtService_1 = require("../../common/services/jwtService");
const jwt_1 = require("@nestjs/jwt");
const clientRepo_1 = require("../DB/repo/clientRepo");
const contractRepo_1 = require("../DB/repo/contractRepo");
const userRepo_1 = require("../DB/repo/userRepo");
let ClientModule = class ClientModule {
};
exports.ClientModule = ClientModule;
exports.ClientModule = ClientModule = __decorate([
    (0, common_1.Module)({
        imports: [client_schema_1.clientModule, user_schema_1.userModule, contract_schema_1.contractModule],
        controllers: [client_controller_1.ClientController],
        providers: [client_service_1.ClientService, clientRepo_1.ClientRepo, contractRepo_1.ContractRepo, userRepo_1.UserRepo, jwtService_1.JwtToken, jwt_1.JwtService, common_1.Logger]
    })
], ClientModule);
//# sourceMappingURL=client.module.js.map