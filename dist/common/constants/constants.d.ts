export declare const APP_CONSTANTS: {
    readonly TOKEN_NAME: "auth_token";
    readonly COOKIE_OPTIONS: {
        readonly maxAge: number;
        readonly httpOnly: true;
        readonly sameSite: "lax" | "strict";
        readonly secure: boolean;
        readonly signed: true;
    };
    readonly JWT_EXPIRE: "1hr";
    readonly SESSION_EXPIRE: number;
    readonly CACHE_TTL: number;
    readonly TIME_ZONE: "Africa/Cairo";
};
