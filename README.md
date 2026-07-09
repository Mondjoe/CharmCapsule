
CharmCapsule Backend is a NestJS API providing user authentication, password hashing, and core service endpoints.  
It uses bcryptjs (Termuxsafe) and runs with pnpm.

Project Structure
src/  
- app.module.ts  
- app.controller.ts  
- app.service.ts  
- modules/user/user.module.ts  
- modules/user/user.controller.ts  
- modules/user/user.service.ts  

Tech Stack
NestJS  
TypeScript  
pnpm  
bcryptjs  
Node.js 20+ / 26  

Installation
pnpm install

Run Development
pnpm dev

Production
pnpm build  
pnpm start

Password Hashing (bcryptjs)
Code example (not terminal commands):  
- bcrypt.hash(password, 10)  
- bcrypt.compare(password, hashed)

Health Check
GET /  
Response: Backend is running

Scripts (package.json)
scripts:  
- dev: nest start --watch  
- start: nest start  
- build: nest build  

Troubleshooting
If pnpm dev not found:  
Add dev script to package.json.

If bcrypt build error:  
Use bcryptjs instead of bcrypt.  
Replace import bcrypt  import bcryptjs.  
Then:  
rm -rf node_modules  
rm pnpm-lock.yaml  
pnpm install

If Termux repo errors:  
termux-change-repo

License
Owned and maintained by Charm_Capsule.