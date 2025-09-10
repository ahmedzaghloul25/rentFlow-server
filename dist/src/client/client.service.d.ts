import { Logger } from '@nestjs/common';
import { _Request } from 'common/types';
import { ClientRepo, ContractRepo } from 'src/DB/repo';
import { ClientDto } from './DTO';
import { Types } from 'mongoose';
import { Cache } from '@nestjs/cache-manager';
import { ClientDoc } from 'src/DB/schema';
export declare class ClientService {
    private readonly clientRepo;
    private readonly contractRepo;
    private cache;
    private logger;
    constructor(clientRepo: ClientRepo, contractRepo: ContractRepo, cache: Cache, logger: Logger);
    addNewClient(req: _Request, body: ClientDto): Promise<{
        message: string;
        client: (import("mongoose").Document<unknown, {}, import("src/DB/schema").Client, {}, {}> & import("src/DB/schema").Client & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }) | (import("mongoose").Document<unknown, {}, import("src/DB/schema").Client, {}, {}> & import("src/DB/schema").Client & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
    } | undefined>;
    deleteClient(req: _Request, client: ClientDoc): Promise<{
        message: string;
        client: import("mongoose").Document<unknown, {}, import("src/DB/schema").Client, {}, {}> & import("src/DB/schema").Client & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    getAllClients(req: _Request, page?: number, limit?: number): Promise<{}>;
    getClient(req: _Request, clientId: string): Promise<{
        message: string;
        client: {};
    }>;
}
