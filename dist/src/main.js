"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const common_1 = require("@nestjs/common");
const winston_config_1 = require("../common/logger/winston.config");
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: winston_config_1.WinstonLogger
    });
    const port = process.env.PORT ?? 3000;
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'Authorization',
            'Cookie',
            'Set-Cookie',
            'X-CSRF-Token'
        ],
        exposedHeaders: ['Set-Cookie'],
    });
    app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
    app.use(passport_1.default.initialize());
    app.use((req, res, next) => {
        console.log('--- COOKIE DEBUGGER ---');
        console.log('Raw Cookies:', req.cookies);
        console.log('Signed Cookies:', req.signedCookies);
        console.log('--- END COOKIE DEBUGGER ---');
        next();
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(port, () => {
        console.log('server is running using port ', port);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map