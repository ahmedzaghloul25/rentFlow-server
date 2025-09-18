import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { _Request } from '../../common/types/types';
import { ClientRepo } from 'src/DB/repo/clientRepo';
import { ClientDto } from './DTO';
import { Types } from 'mongoose';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ClientDoc } from 'src/DB/schema';
import { ContractRepo } from 'src/DB/repo/contractRepo';

@Injectable()
export class ClientService {
    constructor(
        private readonly clientRepo: ClientRepo,
        private readonly contractRepo: ContractRepo,
        @Inject(CACHE_MANAGER) private cache: Cache,
        private logger: Logger
    ) { }

    /**
     * add new client
     * @param req - express request containing the user information
     * @param body - object containing client information
     * @returns object containing message with added client
     */
    async addNewClient(req: _Request, body: ClientDto) {
        try {
            
            const client = await this.clientRepo.createNew({ ...body, user_id: req.user._id })
            return { message: 'client added successfully', client }
        } catch (error) {
            if (error.errorResponse?.code === 11000) {
                throw new BadRequestException('CLIENT_ALREADY_ADDED')
            }
            this.logger.error(`Failed to add new Client by user ${req.user._id}.`, error.stack, ClientService.name)
        }
    }
    /**
     * soft delete a client
     * @param req - express request containing the user information
     * @param clientId - ID of the client
     * @returns object containing message and deleted client
     */
    async deleteClient(req: _Request, client: ClientDoc) {
        try {
            if (!req.user._id.equals(client.user_id)) {                
                throw new UnauthorizedException('UNAUTHORIZED_ACTION')
            }
            const activeContract = await this.contractRepo.findOneRecord({
                client_id: client._id.toHexString(),
                is_terminated: false,
                end_date: { $gte: new Date() },
            })            
            if (activeContract) throw new UnauthorizedException('ACTIVE_CONTRACT_FOUND')
            const result = await this.clientRepo.findOneRecordAndUpdate({
                _id: client._id,
                isDeleted: { $exists: false },
            }, { isDeleted: true })
            if (!result) throw new NotFoundException('CLIENT_NOT_FOUND')
            return { message: "client deleted successfully", client }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error
            }
            this.logger.error(`Failed to delete client ${client._id} by user ${req.user._id}`, error.stack, ClientService.name)
            throw new InternalServerErrorException('FAILED_TO_DELETE_CLIENT')
        }
    }

    /**
     * get all clients registered by user
     * @param req - express request containing the user information
     * @param page - page number
     * @param limit - page limit
     * @returns - object containing message, pagination object, and clients
     */
    async getAllClients(req: _Request, page: number = 1, limit: number = 10) {
        try {
            const skip = (page - 1) * limit;
            const cacheKey = `CLIENTS_${req.user._id}_PAGE_${page}_LIMIT_${limit}`;
            const cachedResult = await this.cache.get(cacheKey);
            if (!cachedResult) {
                const clients = await this.clientRepo.findAllRecords({ user_id: req.user._id, isDeleted: {$exists: false} }, {}, skip, limit);
                const totalCount = await this.clientRepo.countRecords({ user_id: req.user._id, isDeleted: {$exists: false} });
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
        } catch (error) {
            this.logger.error(`Failed to get all clients for user ${req.user._id}`, error.stack, ClientService.name)
            throw new InternalServerErrorException('FAILED_TO_GET_ALL_CLIENTS')
        }
    }
    /**
     * get single client
     * @param req - express request containing the user information
     * @param clientId - ID of the client
     * @returns object containing message and the client
     */
    async getClient(req: _Request, clientId: string) {
        try {
            const cacheKey = `CLIENT_${clientId}`
            const cachedClient = await this.cache.get(cacheKey)
            if (!cachedClient) {
                const client = await this.clientRepo.findOneRecord({ _id: clientId, user_id: req.user._id, isDeleted: { $exists: false } })
                if (!client) throw new NotFoundException('CLIENT_NOT_FOUND')
                await this.cache.set(cacheKey, client)
                return { message: 'client fetched successfully', client }
            }
            return { message: 'client fetched successfully', client: cachedClient }
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error(`Failed to get client ${clientId} for user ${req.user._id}`, error.stack, ClientService.name)
            throw new InternalServerErrorException('FAILED_TO_GET_CLIENT')
        }
    }
}
