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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("./client.service");
const validateToken_1 = require("../../common/guards/validateToken");
const DTO_1 = require("./DTO");
const validateClient_1 = require("../../common/pipes/validateClient");
let ClientController = class ClientController {
    clientService;
    constructor(clientService) {
        this.clientService = clientService;
    }
    async addNewClient(req, body) {
        return await this.clientService.addNewClient(req, body);
    }
    async deleteClient(req, client) {
        return await this.clientService.deleteClient(req, client);
    }
    async getAllClients(req, page, limit) {
        return await this.clientService.getAllClients(req, page, limit);
    }
    async getClientId(req, clientId) {
        return await this.clientService.getClient(req, clientId);
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, DTO_1.ClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "addNewClient", null);
__decorate([
    (0, common_1.Delete)(':clientId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('clientId', validateClient_1.ValidateClient)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "deleteClient", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getAllClients", null);
__decorate([
    (0, common_1.Get)(':clientId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClientId", null);
exports.ClientController = ClientController = __decorate([
    (0, common_1.Controller)('clients'),
    (0, common_1.UseGuards)(validateToken_1.ValidateToken),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
//# sourceMappingURL=client.controller.js.map