---

 CharmCapsule Backend  API Table + Swagger Spec (Upgraded)

 API Table

| Endpoint | Method | Description | Body / Params |
|--------------|------------|------------------|--------------------|
| / | GET | Health check | None |
| /user/register | POST | Register new user | { "username": string, "password": string } |
| /user/login | POST | Login user | { "username": string, "password": string } |
| /user/hash-test | POST | Test hashing (dev only) | { "password": string } |
| /user/compare-test | POST | Test compare (dev only) | { "password": string, "hash": string } |

Notes
- All password operations use bcryptjs  
- No native modules  
- Works on Termux / Android  
- Safe for Node 2026  

---

 Swagger / OpenAPI Spec (AutoReady)

Paste this into your README under Swagger Spec section.  
This is OpenAPI 3.0 format  ready for Swagger UI, Redoc, or Postman import.

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

---

 How to Enable Swagger in NestJS

Add this inside main.ts:

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

Then run:

`
pnpm dev
`

Open Swagger UI:

`
http://localhost:3000/docs
`
Charm_Capsule   
Ill add a clean, professional, CharmCapsulestyle Environment Variables section to your README.  
This section is mobilefriendly, copyready, and fits perfectly with your upgraded README.

Below is the Env Var section you can paste directly into your GitHub repo @Mondjoe/CharmCapsule.

---

 Environment Variables (Env Vars)

CharmCapsule Backend uses environment variables to configure sensitive values such as database credentials, JWT secrets, and runtime options.

Create a file named:

`
.env
`

in the root of your project.

 Common Environment Variables

| Variable | Description | Example |
|--------------|------------------|-------------|
| PORT | Backend server port | 3000 |
| NODE_ENV | Environment mode | development / production |
| JWTSECRET | Secret key for JWT signing | yoursecretkeyhere |
| DB_URL | Database connection string | postgres://user:pass@host:5432/dbname |
| HASH_SALT | Salt rounds for bcryptjs | 10 |

---

 Example .env File

`
PORT=3000
NODE_ENV=development

JWT_SECRET=supersecretkey123
HASH_SALT=10

DB_URL=postgres://postgres:password@localhost:5432/charmcapsule
`

---

 How Env Vars Are Loaded in NestJS

NestJS loads environment variables using @nestjs/config.

Add to app.module.ts:

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

Now you can access env vars anywhere:

`ts
constructor(private config: ConfigService) {}

const secret = this.config.get('JWT_SECRET');
`

---

 Security Notes

- Never commit .env to GitHub  
- Add .env to .gitignore  
- Use environment variables for all secrets  
- bcryptjs salt rounds should be configurable via HASH_SALT  

---

 Add to .gitignore

`
.env
`

---

 Infrastructure,
architected and maintained by Sovereign Architect Charm_Capsule.
.
---