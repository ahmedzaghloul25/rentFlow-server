export declare class Hashing {
    private salt;
    constructor();
    createHash(data: string): string;
    verifyHash(data: string, hash: string): boolean;
    compareHash(data: string, hash: string): boolean;
}
