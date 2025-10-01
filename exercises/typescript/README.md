# TypeScript Exercises

Pure TypeScript exercises for practicing language features, data structures, algorithms, and design patterns.

## Running an Exercise

From the **root** of the monorepo:
```bash
npm start -w @code-playground/ts-exercise-name
```

Or navigate to the exercise directory:
```bash
cd exercises/typescript/exercise-name
npm start
```

## Creating a New TypeScript Exercise

### Method 1: Copy an Existing Exercise (Recommended)

1. **Copy the basic-types folder:**
   ```bash
   cd exercises/typescript
   cp -r basic-types my-new-exercise
   cd my-new-exercise
   ```

2. **Update package.json:**
   ```json
   {
     "name": "@code-playground/ts-my-new-exercise",
     "description": "Your exercise description"
   }
   ```

3. **Edit src/index.ts:**
   - Replace the content with your exercise code
   - Keep the `main()` function pattern
   - Add your logic and tests

4. **Update README.md:**
   - Describe the problem/concept
   - Add examples
   - Update running instructions

5. **Test it:**
   ```bash
   npm start
   ```

### Method 2: Create from Scratch

1. **Create the directory structure:**
   ```bash
   cd exercises/typescript
   mkdir -p my-new-exercise/src
   cd my-new-exercise
   ```

2. **Create package.json:**
   ```json
   {
     "name": "@code-playground/ts-my-new-exercise",
     "version": "1.0.0",
     "description": "Your description",
     "main": "dist/index.js",
     "type": "module",
     "scripts": {
       "start": "npm run build && node dist/index.js",
       "build": "tsc",
       "dev": "tsc --watch"
     },
     "devDependencies": {
       "@types/node": "^20.14.0",
       "typescript": "^5.5.3"
     }
   }
   ```

3. **Create tsconfig.json:**
   ```json
   {
     "compilerOptions": {
       "target": "ES2022",
       "module": "ES2022",
       "lib": ["ES2022"],
       "moduleResolution": "node",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true,
       "resolveJsonModule": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist"]
   }
   ```

4. **Create src/index.ts:**
   ```typescript
   function main() {
       console.log("=== My New Exercise ===\n");
       
       // Your code here
       
       console.log("\n✅ Done!");
   }

   main();
   ```

5. **Install dependencies from root:**
   ```bash
   cd ../../..  # Back to repo root
   npm install
   ```

6. **Run it:**
   ```bash
   npm start -w @code-playground/ts-my-new-exercise
   ```

## TypeScript Exercise Tips

- ✅ **DO:** Use `console.log()` for output (Node.js environment)
- ✅ **DO:** Use `console.assert()` for simple tests
- ✅ **DO:** Keep each exercise focused on one concept
- ✅ **DO:** Add comments explaining the "why"
- ❌ **DON'T:** Use `document` or DOM APIs (not available in Node.js)
- ❌ **DON'T:** Add web server setup (use React exercises for that)
- ❌ **DON'T:** Install heavy dependencies unless necessary

## Common Patterns

### Exercise with Tests
```typescript
function solution(input: number): number {
    // Your implementation
    return input * 2;
}

function main() {
    console.log("=== Exercise Name ===\n");
    
    const result1 = solution(5);
    console.log("Test 1:", result1);
    console.assert(result1 === 10, "Test 1 failed");
    
    console.log("\n✅ All tests passed!");
}

main();
```

### Exercise with Multiple Functions
```typescript
interface MyInterface {
    // ...
}

class MyClass implements MyInterface {
    // ...
}

function helperFunction() {
    // ...
}

function main() {
    // Use your classes and functions
    const instance = new MyClass();
    helperFunction();
}

main();
```

## Scripts Available

All exercises include these npm scripts:

- `npm start` - Compile TypeScript and run (does both automatically!)
- `npm run build` - Only compile TypeScript to JavaScript
- `npm run dev` - Watch mode (auto-recompile on file changes)

---

Happy coding with TypeScript! 🚀

