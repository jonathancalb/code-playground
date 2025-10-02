# Node.js Exercises

Backend and Node.js exercises for practicing server-side development, APIs, authentication, databases, and more.

## Running an Exercise

From the **root** of the monorepo:
```bash
pnpm --filter @code-playground/nodejs-exercise-name start
```

Or navigate to the exercise directory:
```bash
cd exercises/nodejs/exercise-name
pnpm start
```

## Creating a New Node.js Exercise

1. **Initialize the project:**
   ```bash
   cd exercises/nodejs
   mkdir my-new-exercise && cd my-new-exercise
   pnpm init
   ```

2. **Install nodemon:**
   ```bash
   pnpm add -D nodemon
   ```

3. **Add exercise-specific dependencies:**
   ```bash
   # Example: for an Express API
   pnpm add express
   
   # Example: for authentication
   pnpm add bcrypt jsonwebtoken
   ```

4. **Update package.json:**
   ```json
   {
     "name": "@code-playground/nodejs-my-new-exercise",
     "type": "module",
     "scripts": {
       "start": "node src/index.js",
       "dev": "nodemon src/index.js"
     }
   }
   ```

5. **Create src/index.js:**
   ```bash
   mkdir src
   ```
   
   ```javascript
   async function main() {
       console.log("=== My Node.js Exercise ===\n");
       
       // Your code here
       
       console.log("\n✅ Done!");
   }

   main();
   ```

6. **Run it:**
   ```bash
   cd ../../..  # Back to repo root
   pnpm install
   pnpm --filter @code-playground/nodejs-my-new-exercise start
   ```

## Node.js Exercise Tips

- ✅ **DO:** Use async/await for asynchronous operations
- ✅ **DO:** Handle errors properly with try/catch
- ✅ **DO:** Use environment variables for configuration
- ✅ **DO:** Follow REST API conventions for HTTP endpoints
- ✅ **DO:** Use TypeScript for type safety
- ❌ **DON'T:** Hardcode sensitive data (API keys, passwords)
- ❌ **DON'T:** Skip input validation
- ❌ **DON'T:** Commit .env files

## Common Topics

### Web Servers & APIs
- Express.js basics
- RESTful API design
- Middleware
- Request/response handling

### Authentication & Security
- Password hashing (bcrypt)
- JWT tokens
- Session management
- OAuth/Social login

### Databases
- SQL (PostgreSQL, MySQL, SQLite)
- ORMs (Prisma, TypeORM)
- NoSQL (MongoDB)
- Migrations and seeders

### File Operations
- Reading/writing files
- Streaming large files
- CSV/JSON parsing
- File uploads

### Real-time
- WebSockets
- Server-Sent Events (SSE)
- Socket.io

### Testing
- Unit tests (Vitest, Jest)
- Integration tests
- API testing (Supertest)

## Scripts Available

All exercises include these scripts:

- `pnpm start` - Run the exercise
- `pnpm dev` - Watch mode with nodemon (auto-restart on changes)

---

Happy coding with Node.js! 🚀

