export declare const APP_CONSTANTS: {
    readonly AUTH_TOKEN_NAME: "auth_token";
    readonly CSRF_TOKEN_NAME: "csrf_token";
    readonly COOKIE_OPTIONS_AUTH: {
        readonly maxAge: number;
        readonly httpOnly: true;
        readonly sameSite: "lax" | "strict";
        readonly secure: boolean;
        readonly signed: true;
        readonly path: "/";
    };
    readonly COOKIE_OPTIONS_CSRF: {
        readonly maxAge: number;
        readonly httpOnly: false;
        readonly sameSite: "lax" | "strict";
        readonly secure: boolean;
        readonly path: "/";
    };
    readonly JWT_EXPIRE: "1hr";
    readonly SESSION_EXPIRE: number;
    readonly CACHE_TTL: number;
    readonly TIME_ZONE: "Africa/Cairo";
};
