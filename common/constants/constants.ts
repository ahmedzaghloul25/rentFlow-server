

export const APP_CONSTANTS = {
    TOKEN_NAME: 'auth_token',
    COOKIE_OPTIONS: {
        maxAge: 1 * 60 * 60 * 1000, //  4 hrs
        httpOnly: true,
        sameSite: process.env.MODE === "DEV" ? "lax" : "strict",
        secure: process.env.MODE === "DEV" ? false : true,
        signed: true
    },
    JWT_EXPIRE: '1hr',
    SESSION_EXPIRE: 1 * 60 * 60 * 1000,
    CACHE_TTL: 5 * 1000,
    CLIENT_URL: 'http://localhost:3001',
    TIME_ZONE: 'Africa/Cairo',
} as const