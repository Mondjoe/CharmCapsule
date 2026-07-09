README.md---

 CharmCapsule Backend  Full Merged README

 Overview
CharmCapsule Backend is a NestJS API system designed for secure authentication, password hashing, modular service expansion, and Termuxfriendly development.  
It uses bcryptjs to avoid native build failures and is part of the CharmCapsule Web3 Infrastructure built by Charm_Capsule.

---

 Architecture
`
src/
  app.module.ts
  app.controller.ts
  app.service.ts
  modules/
       user/
            user.module.ts
            user.controller.ts
            user.service.ts
`

---

 Tech Stack
- NestJS  
- TypeScript  
- pnpm  
- bcryptjs  
- Node.js 20+ / 26  
- Termux compatible  

---

 Installation
`
pnpm install
`

Run development server:
`
pnpm dev
`

Build for production:
`
pnpm build
pnpm start
`

---

 Password Hashing (bcryptjs)
These are code examples, not terminal commands.

Hash password:
`
bcrypt.hash(password, 10)
`

Compare password:
`
bcrypt.compare(password, hashed)
`

bcryptjs is used because it avoids native compilation and works perfectly on Termux.

---

 Health Check
GET /  
Response:  
`
Backend is running
`

---

 API Table

| Endpoint | Method | Description | Body / Params |
|--------------|------------|------------------|--------------------|
| / | GET | Health check | None |
| /user/register | POST | Register new user | { username, password } |
| /user/login | POST | Login user | { username, password } |
| /user/hash-test | POST | Hash password (dev only) | { password } |
| /user/compare-test | POST | Compare password (dev only) | { password, hash } |

---

 Swagger / OpenAPI Spec

`yaml
openapi: 3.0.0
info:
  title: CharmCapsule Backend API
  version: 1.0.0
  description: API documentation for CharmCapsule NestJS backend.

paths:
  /:
    get:
      summary: Health Check
      responses:
        '200':
          description: Backend is running

  /user/register:
    post:
      summary: Register new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                password:
                  type: string
      responses:
        '201':
          description: User registered

  /user/login:
    post:
      summary: Login user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                password:
                  type: string
      responses:
        '200':
          description: Login successful

  /user/hash-test:
    post:
      summary: Hash password (dev only)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                password:
                  type: string
      responses:
        '200':
          description: Hashed password returned

  /user/compare-test:
    post:
      summary: Compare password (dev only)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                password:
                  type: string
                hash:
                  type: string
      responses:
        '200':
          description: Compare result returned
`

Enable Swagger in NestJS
Add this to main.ts:

`ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('CharmCapsule API')
  .setDescription('CharmCapsule Backend API Documentation')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
`

Open Swagger UI:  
`
http://localhost:3000/docs
`

---

 Environment Variables (Env Vars)

Create a file named .env in your project root.

Common Variables

| Variable | Description | Example |
|---------|-------------|---------|
| PORT | Backend port | 3000 |
| NODE_ENV | Environment mode | development / production |
| JWT_SECRET | JWT signing key | yoursecretkeyhere |
| DB_URL | Database connection string | postgres://user:pass@host:5432/dbname |
| HASH_SALT | bcryptjs salt rounds | 10 |

Example .env

`
PORT=3000
NODE_ENV=development

JWT_SECRET=supersecretkey123
HASH_SALT=10

DB_URL=postgres://postgres:password@localhost:5432/charmcapsule
`

Load Env Vars in NestJS

`ts
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
`

Access anywhere:

`ts
constructor(private config: ConfigService) {}

const secret = this.config.get('JWT_SECRET');
`

Security
- Never commit .env  
- Add .env to .gitignore  
- Use env vars for all secrets  

---

 Troubleshooting

pnpm dev not found
Add "dev" script to package.json.

bcrypt build error
Use bcryptjs instead of bcrypt.  
Then:

`
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
`

Termux repo issues
`
termux-change-repo
`

---

 CharmCapsule Identity
CharmCapsule Backend is part of the CharmCapsule Web3 Ecosystem, architected and maintained by Charm_Capsule, delivering secure, scalable, and elegant digital systems.

---

 License
Owned and maintained by CharmCapsule(Mondjoe)
---