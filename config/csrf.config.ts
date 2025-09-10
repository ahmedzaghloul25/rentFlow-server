import { doubleCsrf } from 'csrf-csrf';
import { Request } from 'express';


const doubleCsrfOptions = {
  getSecret: (req: Request) => req.secret as string,
  getSessionIdentifier: (req: Request) => {
    return req.sessionID;
  }
}
export const {
  generateCsrfToken,
  doubleCsrfProtection,
} = doubleCsrf(doubleCsrfOptions);