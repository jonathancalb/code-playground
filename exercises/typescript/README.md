# TypeScript Exercises

Pure TypeScript exercises for practicing language features, data structures, algorithms, and design patterns.

## Running an Exercise

From the **root** of the monorepo:
```bash
pnpm --filter @code-playground/ts-exercise-name start
```

Or navigate to the exercise directory:
```bash
cd exercises/typescript/exercise-name
pnpm start
```

## Creating a New TypeScript Exercise

1. **Initialize the project:**
   ```bash
   cd exercises/typescript
   mkdir my-new-exercise && cd my-new-exercise
   pnpm init
   ```

2. **Install tsx:**
   ```bash
   pnpm add -D tsx
   ```

3. **Update package.json:**
   ```json
   {
     "name": "@code-playground/ts-my-new-exercise",
     "scripts": {
       "start": "tsx src/index.ts",
       "dev": "tsx watch src/index.ts"
     }
   }
   ```

4. **Create src/index.ts:**
   ```bash
   mkdir src
   ```
   
   ```typescript
   function main() {
       console.log("=== My New Exercise ===\n");
       
       // Your code here
       
       console.log("\n✅ Done!");
   }

   main();
   ```

5. **Run it:**
   ```bash
   cd ../../..  # Back to repo root
   pnpm install
   pnpm --filter @code-playground/ts-my-new-exercise start
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

All exercises include these scripts:

- `pnpm start` - Run TypeScript directly with tsx
- `pnpm dev` - Watch mode (auto-restart on file changes)

---

Happy coding with TypeScript! 🚀

