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
const schema_1 = require("../DB/schema");
const services_1 = require("../../common/services");
const jwt_1 = require("@nestjs/jwt");
const client_repo_1 = require("../DB/repo/client.repo");
const contract_repo_1 = require("../DB/repo/contract.repo");
const user_repo_1 = require("../DB/repo/user.repo");
let ClientModule = class ClientModule {
};
exports.ClientModule = ClientModule;
exports.ClientModule = ClientModule = __decorate([
    (0, common_1.Module)({
        imports: [schema_1.clientModule, schema_1.userModule, schema_1.contractModule],
        controllers: [client_controller_1.ClientController],
        providers: [client_service_1.ClientService, client_repo_1.ClientRepo, contract_repo_1.ContractRepo, user_repo_1.UserRepo, services_1.JwtToken, jwt_1.JwtService, common_1.Logger]
    })
], ClientModule);
//# sourceMappingURL=client.module.js.map