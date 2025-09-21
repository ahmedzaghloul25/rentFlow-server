

export const APP_CONSTANTS = {
    AUTH_TOKEN_NAME: 'auth_token',
    CSRF_TOKEN_NAME: 'csrf_token',
    COOKIE_OPTIONS_AUTH: {
        maxAge: 1 * 60 * 60 * 1000, //  1 hrs
        httpOnly: true,
        sameSite: process.env.NODE_ENV !== "production" ? "lax" : "none",
        secure: process.env.NODE_ENV === "production",
        signed: true,
        path: '/',
        domain: undefined
    },
    COOKIE_OPTIONS_CSRF: {
        maxAge: 1 * 60 * 60 * 1000, //  1 hrs
        httpOnly: false,
        sameSite: process.env.NODE_ENV !== "production" ? "lax" : "none",
        secure: process.env.NODE_ENV === "production",
        path: '/',
        domain: undefined
    },
    JWT_EXPIRE: '1hr',
    SESSION_EXPIRE: 1 * 60 * 60 * 1000,
    CACHE_TTL: 5 * 1000,
    TIME_ZONE: 'Africa/Cairo',
} as const