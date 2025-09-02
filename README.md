```markdown
# rentFlow

## Project Status
**Completed**

## Objective
rentFlow is a backend system built with **NestJS** and **Mongoose** that streamlines property management tasks. It allows users to register their properties, manage clients, create rental contracts, and track payment records. The project also integrates authentication, session handling, and logging, providing a secure and scalable foundation for real-world rental workflows.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rentFlow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables in a `.env` file:
   ```env
   DB_URL=<your-mongodb-uri>
   PORT=<application-port>
   SALT_ROUND=<bcrypt-salt-rounds>
   GOOGLE_CLIENT_ID=<google-oauth-client-id>
   GOOGLE_CLIENT_SECRET=<google-oauth-client-secret>
   SESSION_SECRET=<express-session-secret>
   JWT_SECRET_ACCESS=<jwt-secret>
   MODE=<development-or-production>
   COOKIE_SECRET=<cookie-secret>
   ```

4. Build the project (optional):
   ```bash
   npm run build
   ```

## Usage

Start the backend in watch mode for development:
```bash
npm run start:dev
```

Other useful scripts:
- Start production build:
  ```bash
  npm run start:prod
  ```
- Run tests:
  ```bash
  npm run test
  ```
- Lint code:
  ```bash
  npm run lint
  ```

## To-Do
- :bookmark_tabs: Enable saving contract scans to cloud storage.

## External Documentation and Resources
- [NestJS Documentation](https://docs.nestjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Passport (Authentication)](http://www.passportjs.org/)
- [Winston (Logging)](https://github.com/winstonjs/winston)

---

_Last Updated: 2025-09-03_
```

Would you like me to also add an **API Endpoints** section (with placeholder routes for properties, clients, contracts, and payments), so future users know where to start?