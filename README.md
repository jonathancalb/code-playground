# Code Playground

A monorepo for coding exercises and practice projects using npm workspaces, organized by category.

## Structure

```
code-playground/
├── exercises/
│   ├── react/              # React exercises
│   │   └── counter-app/
│   ├── typescript/         # TypeScript exercises
│   │   └── basic-types/
│   ├── algorithms/         # Algorithm challenges
│   └── [other-categories]/ # Add your own categories
└── package.json           # Root package.json with workspace configuration
```

## Getting Started

### Initial Setup

```bash
npm install
```

This will install dependencies for all exercises in the monorepo.

### Creating a New Exercise

1. Decide on a category (or create a new one):
   ```bash
   mkdir -p exercises/your-category
   ```

2. Create a new exercise directory:
   ```bash
   mkdir exercises/your-category/my-exercise
   cd exercises/your-category/my-exercise
   ```

3. Initialize a new package:
   ```bash
   npm init -y
   ```

4. Update the package name in `package.json` to follow the convention:
   ```json
   {
     "name": "@code-playground/your-category-my-exercise",
     ...
   }
   ```

5. Add your code and start working!

## Exercise Categories

### React
Full React applications with Vite, HMR, and modern tooling.

**Example:** `exercises/react/counter-app`

### TypeScript
Pure TypeScript exercises for practicing types, generics, and advanced features.

**Example:** `exercises/typescript/basic-types`

### Algorithms
Data structures and algorithm challenges (add as needed).

### Create Your Own
Feel free to add categories like `nextjs/`, `node/`, `python/`, etc.

## Running an Exercise

From the **root** directory:
```bash
npm run <script> -w @code-playground/category-exercise-name
```

Examples:
```bash
# React (dev server)
npm run dev -w @code-playground/react-counter-app

# TypeScript (compile and run)
npm start -w @code-playground/ts-basic-types
```

Or navigate to the exercise directory and run directly:
```bash
cd exercises/react/counter-app
npm run dev
```

## Adding Dependencies to an Exercise

From the **root** directory:
```bash
npm install <package-name> -w @code-playground/category-exercise-name
```

Or navigate to the exercise directory:
```bash
cd exercises/your-category/your-exercise
npm install <package-name>
```

## Cleaning Up

Remove all node_modules:
```bash
npm run clean
```

## Tips

- Each exercise is **completely independent** with its own dependencies
- Organize by technology/topic (react, typescript, algorithms, etc.)
- Each category can have multiple exercises
- Use meaningful names: `@code-playground/react-todo-app`, `@code-playground/ts-generics`
- The root `package.json` only manages the workspace
- Different exercises can use completely different tech stacks
- Add `.gitignore` patterns as needed

## Quick Reference

| Category | Example Exercise | Run Command |
|----------|-----------------|-------------|
| React | `counter-app` | `npm run dev -w @code-playground/react-counter-app` |
| TypeScript | `basic-types` | `npm start -w @code-playground/ts-basic-types` |
| Algorithms | *(add your own)* | - |

---

Happy coding! 🚀
