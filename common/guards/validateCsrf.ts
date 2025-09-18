import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { APP_CONSTANTS } from "../constants/constants";

@Injectable()
export class ValidateCsrf implements CanActivate {
    constructor() { }
    private safeMethods = ['GET', 'HEAD', 'OPTIONS']

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const csrfHeaders = request.headers['x-csrf-token']
        const csrfCookie = request.cookies[APP_CONSTANTS.CSRF_TOKEN_NAME]

        if(this.safeMethods.includes(request.method.toUpperCase())){
            return true
        }
        
        if (!csrfCookie || !csrfHeaders) throw new ForbiddenException('MISSING_CSRF_TOKEN')
        if (csrfCookie !== csrfHeaders) {
            return false
        }
        return true
    }
}