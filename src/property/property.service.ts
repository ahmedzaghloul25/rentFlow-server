import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AddNewProperty } from './DTO/propertyDto';
import { _Request } from 'common/types';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { PropertyDoc } from 'src/DB/schema';
import { PropertyRepo } from 'src/DB/repo/propertyRepo';
import { ContractRepo } from 'src/DB/repo/contractRepo';

@Injectable()
export class PropertyService {
    constructor(private readonly propertyRepo: PropertyRepo,
        @Inject(CACHE_MANAGER) private cache: Cache,
        private readonly contractRepo: ContractRepo,
        private logger: Logger
    ) { }


    /**
     * add new property 
     * @param req - express request containing user information
     * @param body - object containing property information
     * @returns object containing message with added property
     */
    async addNewProperty(req: _Request, body: AddNewProperty) {
        try {
            const { user } = req
            const property = await this.propertyRepo.createNew({
                ...body,
                user_id: user._id
            })
            return { message: 'property created successfully', property }
        } catch (error) {
            if (error.errorResponse?.code === 11000) {
                throw new BadRequestException("PROPERTY_ALREADY_REGISTERED")
            }
            this.logger.error(`Failed to add new property by user ${req.user._id}`, error.stack, PropertyService.name)
            throw new InternalServerErrorException("FAILED_TO _ADD_PROPERTY")
        }
    }
    /**
     * delete a property
     * @param property - the property to be deleted
     * @param req - express request containing user information
     * @returns object containing message
     */
    async deleteProperty(property: PropertyDoc, req: _Request) {
        try {
            if (!req.user._id.equals(property.user_id)) {
                throw new UnauthorizedException('UNAUTHORIZED_ACTION')
            }
            const activeContract = await this.contractRepo.findOneRecord({
                property_id: property._id,
                user_id: req.user._id,
                is_terminated: false,
                end_date: { $gte: new Date() },
                actual_end_date: null
            })
            if (activeContract) throw new UnauthorizedException('ACTIVE_CONTRACT_FOUND')
            const result = await this.propertyRepo.findOneRecordAndUpdate(
                { _id: property._id },
                { isDeleted: true }
            )
            if (!result) throw new NotFoundException('PROPERTY_NOT_FOUND')
            return { message: 'property deleted successfully', property: result }
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error(`Failed to delete property ${property._id} for user ${req.user._id}`, error.stack, PropertyService.name)
            throw new InternalServerErrorException('FAILED_TO_DELETE_PROPERTY')
        }
    }
    /**
     * get all properties
     * @param req - express request containing user information
     * @param page - page number
     * @param limit - record per page
     * @returns object containing success boolean, message, pagination object, and properties
     */
    async getAllProperties(req: _Request, page: number = 1, limit: number = 10) {
        try {
            const skip = (page - 1) * limit
            const cacheKey = `PROPERTIES_${req.user._id}_PAGE_${page}_LIMIT_${limit}`
            const cachedProperties = await this.cache.get(cacheKey)
            if (!cachedProperties) {
                const properties = await this.propertyRepo.findAllRecords({ user_id: req.user._id, isDeleted: { $exists: false } }, {}, skip, limit)
                const totalCount = await this.propertyRepo.countRecords({ user_id: req.user._id, isDeleted: { $exists: false } })
                const result = {
                    message: "properties fetched successfully",
                    pagination: {
                        totalRecords: totalCount,
                        page,
                        limit,
                        totalPages: Math.ceil(totalCount / limit)
                    },
                    properties
                }
                await this.cache.set(cacheKey, result)
                return result
            }
            return cachedProperties
        } catch (error) {
            this.logger.error(`Failed to get all Properties for user ${req.user._id}`, error.stack, PropertyService.name)
            throw new InternalServerErrorException('FAILED_TO_GET_PROPERTIES')
        }
    }
    /**
     * get single property
     * @param propertyId - the ID for the property
     * @param req - express request containing user information
     * @returns object containing success boolean, message, pagination object, and property
     */
    async getProperty(propertyId: string, req: _Request) {
        try {
            const cacheKey = `PROPERTY_${propertyId}_USER_${req.user._id}`
            const cachedProperty = await this.cache.get<PropertyDoc>(cacheKey)
            if (!cachedProperty) {
                const property = await this.propertyRepo.findOneRecord({ _id: propertyId, user_id: req.user._id, isDeleted: { $exists: false } })
                if (!property) {
                    throw new NotFoundException('PROPERTY_NOT_FOUND')
                }
                await this.cache.set(cacheKey, property)
                return { message: 'property fetched successfully', property }
            }
            return { message: 'property fetched successfully', property: cachedProperty }
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error(`Failed to get Property ${propertyId} for user ${req.user._id}`, error.stack, PropertyService.name)
            throw new InternalServerErrorException('FAILED_TO_GET_PROPERTy')
        }
    }
}
