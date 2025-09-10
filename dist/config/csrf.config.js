"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.doubleCsrfProtection = exports.generateCsrfToken = void 0;
const csrf_csrf_1 = require("csrf-csrf");
const doubleCsrfOptions = {
    getSecret: (req) => req.secret,
    getSessionIdentifier: (req) => {
        return req.sessionID;
    }
};
_a = (0, csrf_csrf_1.doubleCsrf)(doubleCsrfOptions), exports.generateCsrfToken = _a.generateCsrfToken, exports.doubleCsrfProtection = _a.doubleCsrfProtection;
//# sourceMappingURL=csrf.config.js.map