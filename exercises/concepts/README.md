# Concepts Exercises

General programming concepts including design patterns, authentication, backend fundamentals, and language features.

## Running an Exercise

From the **root** of the monorepo:
```bash
pnpm --filter @code-playground/concepts-exercise-name start
```

Or navigate to the exercise directory:
```bash
cd exercises/concepts/exercise-name
pnpm start
```

## Current Exercises

- **authentication** - Full-stack authentication with sessions, Redis, and JWT
- **dependency-inversion** - Dependency Inversion Principle (DIP) practice
- **basic-types** - TypeScript basic types and type safety

## Creating a New Concept Exercise

1. **Initialize the project:**
   ```bash
   cd exercises/concepts
   mkdir my-new-exercise && cd my-new-exercise
   pnpm init
   ```

2. **Install dependencies based on exercise type:**
   ```bash
   # For Node.js concepts (auth, APIs, etc.)
   pnpm add -D nodemon
   pnpm add express  # or other dependencies
   
   # For TypeScript concepts (patterns, types, etc.)
   pnpm add -D typescript @types/node
   ```

3. **Update package.json:**
   ```json
   {
     "name": "@code-playground/concepts-my-new-exercise",
     "type": "module",
     "scripts": {
       "start": "node src/index.js",
       "dev": "nodemon src/index.js"
     }
   }
   ```

4. **Run it:**
   ```bash
   cd ../../..  # Back to repo root
   pnpm install
   pnpm --filter @code-playground/concepts-my-new-exercise start
   ```

## Common Topics

### Backend Concepts
- Authentication & Authorization
- Session management
- JWT tokens
- API design (REST, GraphQL)
- Middleware patterns

### Design Patterns
- SOLID principles
- Dependency Injection
- Factory, Strategy, Observer
- Repository pattern

### Language Features
- TypeScript advanced types
- Generics and type inference
- Async/await patterns
- Error handling

---

Happy learning! 🚀

