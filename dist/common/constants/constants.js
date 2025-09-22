"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_CONSTANTS = void 0;
exports.APP_CONSTANTS = {
    AUTH_TOKEN_NAME: 'auth_token',
    CSRF_TOKEN_NAME: 'csrf_token',
    COOKIE_OPTIONS_AUTH: {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        signed: true,
        partitioned: true,
        path: '/',
    },
    COOKIE_OPTIONS_CSRF: {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        partitioned: true,
        path: '/',
    },
    JWT_EXPIRE: '1hr',
    SESSION_EXPIRE: 1 * 60 * 60 * 1000,
    CACHE_TTL: 5 * 1000,
    TIME_ZONE: 'Africa/Cairo',
};
//# sourceMappingURL=constants.js.map