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
var ClientService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const clientRepo_1 = require("../DB/repo/clientRepo");
const cache_manager_1 = require("@nestjs/cache-manager");
const contractRepo_1 = require("../DB/repo/contractRepo");
let ClientService = ClientService_1 = class ClientService {
    clientRepo;
    contractRepo;
    cache;
    logger;
    constructor(clientRepo, contractRepo, cache, logger) {
        this.clientRepo = clientRepo;
        this.contractRepo = contractRepo;
        this.cache = cache;
        this.logger = logger;
    }
    async addNewClient(req, body) {
        try {
            const client = await this.clientRepo.createNew({ ...body, user_id: req.user._id });
            return { message: 'client added successfully', client };
        }
        catch (error) {
            if (error.errorResponse?.code === 11000) {
                throw new common_1.BadRequestException('CLIENT_ALREADY_ADDED');
            }
            this.logger.error(`Failed to add new Client by user ${req.user._id}.`, error.stack, ClientService_1.name);
        }
    }
    async deleteClient(req, client) {
        try {
            if (!req.user._id.equals(client.user_id)) {
                throw new common_1.UnauthorizedException('UNAUTHORIZED_ACTION');
            }
            const activeContract = await this.contractRepo.findOneRecord({
                client_id: client._id.toHexString(),
                is_terminated: false,
                end_date: { $gte: new Date() },
            });
            if (activeContract)
                throw new common_1.UnauthorizedException('ACTIVE_CONTRACT_FOUND');
            const result = await this.clientRepo.findOneRecordAndUpdate({
                _id: client._id,
                isDeleted: { $exists: false },
            }, { isDeleted: true });
            if (!result)
                throw new common_1.NotFoundException('CLIENT_NOT_FOUND');
            return { message: "client deleted successfully", client };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error(`Failed to delete client ${client._id} by user ${req.user._id}`, error.stack, ClientService_1.name);
            throw new common_1.InternalServerErrorException('FAILED_TO_DELETE_CLIENT');
        }
    }
    async getAllClients(req, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const cacheKey = `CLIENTS_${req.user._id}_PAGE_${page}_LIMIT_${limit}`;
            const cachedResult = await this.cache.get(cacheKey);
            if (!cachedResult) {
                const clients = await this.clientRepo.findAllRecords({ user_id: req.user._id, isDeleted: { $exists: false } }, {}, skip, limit);
                const totalCount = await this.clientRepo.countRecords({ user_id: req.user._id, isDeleted: { $exists: false } });
                const result = {
                    message: "clients fetched successfully",
                    pagination: {
                        totalRecords: totalCount,
                        page,
                        limit,
                        totalPages: Math.ceil(totalCount / limit)
                    },
                    clients
                };
                await this.cache.set(cacheKey, result);
                return result;
            }
            return cachedResult;
        }
        catch (error) {
            this.logger.error(`Failed to get all clients for user ${req.user._id}`, error.stack, ClientService_1.name);
            throw new common_1.InternalServerErrorException('FAILED_TO_GET_ALL_CLIENTS');
        }
    }
    async getClient(req, clientId) {
        try {
            const cacheKey = `CLIENT_${clientId}`;
            const cachedClient = await this.cache.get(cacheKey);
            if (!cachedClient) {
                const client = await this.clientRepo.findOneRecord({ _id: clientId, user_id: req.user._id, isDeleted: { $exists: false } });
                if (!client)
                    throw new common_1.NotFoundException('CLIENT_NOT_FOUND');
                await this.cache.set(cacheKey, client);
                return { message: 'client fetched successfully', client };
            }
            return { message: 'client fetched successfully', client: cachedClient };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error(`Failed to get client ${clientId} for user ${req.user._id}`, error.stack, ClientService_1.name);
            throw new common_1.InternalServerErrorException('FAILED_TO_GET_CLIENT');
        }
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = ClientService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [clientRepo_1.ClientRepo,
        contractRepo_1.ContractRepo,
        cache_manager_1.Cache,
        common_1.Logger])
], ClientService);
//# sourceMappingURL=client.service.js.map