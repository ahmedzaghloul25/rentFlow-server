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
var PropertyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const property_repo_1 = require("../DB/repo/property.repo");
const contract_repo_1 = require("../DB/repo/contract.repo");
let PropertyService = PropertyService_1 = class PropertyService {
    propertyRepo;
    cache;
    contractRepo;
    logger;
    constructor(propertyRepo, cache, contractRepo, logger) {
        this.propertyRepo = propertyRepo;
        this.cache = cache;
        this.contractRepo = contractRepo;
        this.logger = logger;
    }
    async addNewProperty(req, body) {
        try {
            const { user } = req;
            const property = await this.propertyRepo.createNew({
                ...body,
                user_id: user._id
            });
            return { message: 'property created successfully', property };
        }
        catch (error) {
            if (error.errorResponse?.code === 11000) {
                throw new common_1.BadRequestException("PROPERTY_ALREADY_REGISTERED");
            }
            this.logger.error(`Failed to add new property by user ${req.user._id}`, error.stack, PropertyService_1.name);
            throw new common_1.InternalServerErrorException("FAILED_TO _ADD_PROPERTY");
        }
    }
    async deleteProperty(property, req) {
        try {
            if (!req.user._id.equals(property.user_id)) {
                throw new common_1.UnauthorizedException('UNAUTHORIZED_ACTION');
            }
            const activeContract = await this.contractRepo.findOneRecord({
                property_id: property._id,
                user_id: req.user._id,
                is_terminated: false,
                end_date: { $gte: new Date() },
                actual_end_date: null
            });
            if (activeContract)
                throw new common_1.UnauthorizedException('ACTIVE_CONTRACT_FOUND');
            const result = await this.propertyRepo.findOneRecordAndUpdate({ _id: property._id }, { isDeleted: true });
            if (!result)
                throw new common_1.NotFoundException('PROPERTY_NOT_FOUND');
            return { message: 'property deleted successfully', property: result };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error(`Failed to delete property ${property._id} for user ${req.user._id}`, error.stack, PropertyService_1.name);
            throw new common_1.InternalServerErrorException('FAILED_TO_DELETE_PROPERTY');
        }
    }
    async getAllProperties(req, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const cacheKey = `PROPERTIES_${req.user._id}_PAGE_${page}_LIMIT_${limit}`;
            const cachedProperties = await this.cache.get(cacheKey);
            if (!cachedProperties) {
                const properties = await this.propertyRepo.findAllRecords({ user_id: req.user._id, isDeleted: { $exists: false } }, {}, skip, limit);
                const totalCount = await this.propertyRepo.countRecords({ user_id: req.user._id, isDeleted: { $exists: false } });
                const result = {
                    message: "properties fetched successfully",
                    pagination: {
                        totalRecords: totalCount,
                        page,
                        limit,
                        totalPages: Math.ceil(totalCount / limit)
                    },
                    properties
                };
                await this.cache.set(cacheKey, result);
                return result;
            }
            return cachedProperties;
        }
        catch (error) {
            this.logger.error(`Failed to get all Properties for user ${req.user._id}`, error.stack, PropertyService_1.name);
            throw new common_1.InternalServerErrorException('FAILED_TO_GET_PROPERTIES');
        }
    }
    async getProperty(propertyId, req) {
        try {
            const cacheKey = `PROPERTY_${propertyId}_USER_${req.user._id}`;
            const cachedProperty = await this.cache.get(cacheKey);
            if (!cachedProperty) {
                const property = await this.propertyRepo.findOneRecord({ _id: propertyId, user_id: req.user._id, isDeleted: { $exists: false } });
                if (!property) {
                    throw new common_1.NotFoundException('PROPERTY_NOT_FOUND');
                }
                await this.cache.set(cacheKey, property);
                return { message: 'property fetched successfully', property };
            }
            return { message: 'property fetched successfully', property: cachedProperty };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error(`Failed to get Property ${propertyId} for user ${req.user._id}`, error.stack, PropertyService_1.name);
            throw new common_1.InternalServerErrorException('FAILED_TO_GET_PROPERTy');
        }
    }
};
exports.PropertyService = PropertyService;
exports.PropertyService = PropertyService = PropertyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [property_repo_1.PropertyRepo,
        cache_manager_1.Cache,
        contract_repo_1.ContractRepo,
        common_1.Logger])
], PropertyService);
//# sourceMappingURL=property.service.js.map