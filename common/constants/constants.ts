

export const APP_CONSTANTS = {
    TOKEN_NAME: 'auth_token',
    COOKIE_OPTIONS: {
        maxAge: 60 * 60 * 1000, //  1 hrs
        httpOnly: false,
        sameSite: process.env.MODE === "DEV" ? "lax" : "strict",
        secure: process.env.MODE === "DEV" ? false : true,
        signed: true
    },
    JWT_EXPIRE : '4hr',
    SESSION_EXPIRE: 4 * 60 * 60 * 1000,
    CACHE_TTL : 15 * 1000,
    CLIENT_URL : 'http://localhost:3000',
    TIME_ZONE: 'Africa/Cairo'
} as const