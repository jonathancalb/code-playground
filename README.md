# Code Playground

A monorepo for coding exercises and practice projects using pnpm workspaces, organized by category.

## Structure

```
code-playground/
├── exercises/
│   ├── concepts/           # General programming concepts
│   │   ├── authentication/
│   │   ├── dependency-inversion/
│   │   └── basic-types/
│   ├── algorithms/         # Algorithm challenges
│   │   ├── anagram-grouper/
│   │   ├── array-sort/
│   │   └── frequency-sorter/
│   ├── react/              # React applications
│   │   ├── counter-app/
│   │   ├── gif-search/
│   │   └── users-with-routing/
│   └── [other-categories]/ # Add your own categories
└── package.json           # Root package.json with workspace configuration
```

## Getting Started

### Initial Setup

```bash
pnpm install
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
   pnpm init
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

### Concepts
General programming concepts including design patterns, authentication, backend fundamentals, and architecture patterns.

**Examples:** 
- `exercises/concepts/authentication` - Full-stack auth with sessions and JWT
- `exercises/concepts/dependency-inversion` - Design pattern practice
- `exercises/concepts/microfrontends` - Microfrontend architecture with vanilla JS

### Algorithms
Data structures and algorithm challenges for problem-solving practice.

**Examples:**
- `exercises/algorithms/anagram-grouper` - Group anagrams using Map
- `exercises/algorithms/array-sort` - Array sorting with comparators
- `exercises/algorithms/frequency-sorter` - Sort by element frequency

### React
Full React applications with Vite, HMR, and modern tooling.

**Examples:**
- `exercises/react/counter-app` - Simple counter with state
- `exercises/react/gif-search` - API integration with pagination
- `exercises/react/users-with-routing` - React Router practice

### Create Your Own
Feel free to add categories like `vue/`, `nextjs/`, `databases/`, etc.

## Running an Exercise

From the **root** directory:
```bash
pnpm --filter @code-playground/category-exercise-name <script>
```

Examples:
```bash
# React (dev server)
pnpm --filter @code-playground/react-counter-app dev

# Concepts (compile and run)
pnpm --filter @code-playground/concepts-authentication dev

# Algorithms (compile and run)
pnpm --filter @code-playground/algorithms-anagram-grouper start
```

Or navigate to the exercise directory and run directly:
```bash
cd exercises/react/counter-app
pnpm dev
```

## Adding Dependencies to an Exercise

From the **root** directory:
```bash
pnpm --filter @code-playground/category-exercise-name add <package-name>
```

Or navigate to the exercise directory:
```bash
cd exercises/your-category/your-exercise
pnpm add <package-name>
```

## Cleaning Up

Remove all node_modules:
```bash
pnpm clean
```

## Tips

- Each exercise is **completely independent** with its own dependencies
- Organize by technology/topic (react, typescript, algorithms, etc.)
- Each category can have multiple exercises
- Use meaningful names: `@code-playground/react-todo-app`, `@code-playground/algorithms-binary-search`, `@code-playground/concepts-oauth`
- The root `package.json` only manages the workspace
- Different exercises can use completely different tech stacks
- Add `.gitignore` patterns as needed

## Quick Reference

| Category | Example Exercise | Run Command |
|----------|-----------------|-------------|
| Concepts | `authentication` | `pnpm --filter @code-playground/concepts-authentication dev` |
| Concepts | `microfrontends` | See [Microfrontends README](exercises/concepts/microfrontends/README.md) |
| Algorithms | `anagram-grouper` | `pnpm --filter @code-playground/algorithms-anagram-grouper start` |
| React | `counter-app` | `pnpm --filter @code-playground/react-counter-app dev` |

---

Happy coding! 🚀
