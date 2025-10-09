# Algorithm Exercises

Data structures and algorithm challenges for problem-solving practice.

## Running an Exercise

From the **root** of the monorepo:
```bash
pnpm --filter @code-playground/algorithms-exercise-name start
```

Or navigate to the exercise directory:
```bash
cd exercises/algorithms/exercise-name
pnpm start
```

## Current Exercises

- **anagram-grouper** - Group anagrams using Map data structure
- **array-join** - Implement join operation between two arrays
- **array-sort** - Practice Array.prototype.sort with different comparators
- **find-duplicates** - Find duplicate numbers using Set data structure
- **frequency-sorter** - Sort array by frequency of elements

## Creating a New Algorithm Exercise

1. **Initialize the project:**
   ```bash
   cd exercises/algorithms
   mkdir my-algorithm && cd my-algorithm
   pnpm init
   ```

2. **Install TypeScript:**
   ```bash
   pnpm add -D typescript @types/node
   ```

3. **Create tsconfig.json:**
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "ES2020",
       "lib": ["ES2020"],
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true,
       "moduleResolution": "node"
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist"]
   }
   ```

4. **Update package.json:**
   ```json
   {
     "name": "@code-playground/algorithms-my-algorithm",
     "type": "module",
     "main": "dist/index.js",
     "scripts": {
       "start": "npm run build && node dist/index.js",
       "build": "tsc",
       "dev": "tsc --watch"
     }
   }
   ```

5. **Create src/index.ts:**
   ```typescript
   function myAlgorithm(input: number[]): number[] {
       // Your implementation
       return input;
   }

   function main() {
       console.log("=== My Algorithm ===\n");
       
       const result = myAlgorithm([1, 2, 3]);
       console.log("Result:", result);
       
       console.log("\n✅ Done!");
   }

   main();
   ```

6. **Run it:**
   ```bash
   cd ../../..  # Back to repo root
   pnpm install
   pnpm --filter @code-playground/algorithms-my-algorithm start
   ```

## Algorithm Exercise Tips

- ✅ **DO:** Focus on time and space complexity
- ✅ **DO:** Test with edge cases (empty arrays, single elements, etc.)
- ✅ **DO:** Use TypeScript for type safety
- ✅ **DO:** Add console.assert() for quick tests
- ✅ **DO:** Comment your approach and Big O analysis
- ❌ **DON'T:** Add heavy dependencies (algorithms should be pure)
- ❌ **DON'T:** Use built-in methods when practicing the algorithm itself

## Common Data Structures

- Arrays and Strings
- Hash Maps and Sets
- Linked Lists
- Stacks and Queues
- Trees and Graphs
- Heaps

## Common Algorithm Patterns

- Two Pointers
- Sliding Window
- Binary Search
- Recursion and Backtracking
- Dynamic Programming
- Sorting and Searching

---

Happy coding! 🚀

