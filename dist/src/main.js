"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
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