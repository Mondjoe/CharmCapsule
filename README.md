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

---
CharmCapsule Backend is part of the CharmCapsule Web3 Infrastructure,
architected and maintained by Sovereign Architect Charm_Capsule.
.
---