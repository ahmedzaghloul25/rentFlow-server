"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const common_1 = require("@nestjs/common");
const logger_1 = require("../common/logger");
const constants_1 = require("../common/constants");
const helmet_1 = __importDefault(require("helmet"));
const csrf_config_1 = require("../config/csrf.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: logger_1.WinstonLogger
    });
    const port = process.env.PORT ?? 3000;
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: constants_1.APP_CONSTANTS.SESSION_EXPIRE },
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use(csrf_config_1.doubleCsrfProtection);
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