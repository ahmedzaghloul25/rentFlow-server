import { ClientService } from './client.service';
import type { _Request } from '../../common/types/types';
import { ClientDto } from './DTO';
import type { ClientDoc } from 'src/DB/schema';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    addNewClient(req: _Request, body: ClientDto): Promise<{
        message: string;
        client: (import("mongoose").Document<unknown, {}, import("src/DB/schema").Client, {}, {}> & import("src/DB/schema").Client & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | (import("mongoose").Document<unknown, {}, import("src/DB/schema").Client, {}, {}> & import("src/DB/schema").Client & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    } | undefined>;
    deleteClient(req: _Request, client: ClientDoc): Promise<{
        message: string;
        client: import("mongoose").Document<unknown, {}, import("src/DB/schema").Client, {}, {}> & import("src/DB/schema").Client & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    getAllClients(req: _Request, page: number, limit: number): Promise<{}>;
    getClientId(req: _Request, clientId: string): Promise<{
        message: string;
        client: {};
    }>;
}
