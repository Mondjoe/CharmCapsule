
CharmCapsule Backend is a NestJS-powered API system designed for secure authentication, password hashing, and modular service expansion.  
It is optimized for Termux (Android) and uses bcryptjs to ensure smooth installation without native build failures.

This backend is part of the CharmCapsule Web3 ecosystem, built by Sovereign Architect Charm_Capsule.

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

Modules
- App Module  Core bootstrap  
- User Module  Authentication, hashing, comparison  
- User Service  bcryptjs logic  
- User Controller  API endpoints  

---

 Tech Stack
- NestJS  
- TypeScript  
- pnpm  
- bcryptjs  
- Node.js 20+ / 26  
- Termux (Android) compatible  

---

 Installation
Install dependencies:

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

Hash password
`ts
const hashed = await bcrypt.hash(password, 10);
`

Compare password
`ts
const valid = await bcrypt.compare(password, hashed);
`

bcryptjs is used because it:  
- avoids native compilation  
- works on Termux  
- avoids node-gyp errors  
- is stable across Node 2026  

---

 Health Check

GET /
Response:
`
Backend is running
`

---

 Scripts (package.json)
Your package.json must include:

`
"scripts": {
  "dev": "nest start --watch",
  "start": "nest start",
  "build": "nest build"
}
`

---

 Troubleshooting

 pnpm dev not found
Add "dev" script to package.json.

 bcrypt build error
Use bcryptjs instead of bcrypt.

Replace:
`
import * as bcrypt from 'bcrypt';
`

With:
`
import * as bcrypt from 'bcryptjs';
`

Then clean install:
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
CharmCapsule Backend is part of the CharmCapsule Web3 Infrastructure, designed and architected by Charm_Capsule, delivering secure, scalable, and elegant digital systems.

---

 License
Owned and maintained by Charm_Capsule.