# React Exercises

React applications with Vite for fast development and Hot Module Replacement (HMR).

## Running an Exercise

From the **root** of the monorepo:
```bash
pnpm --filter @code-playground/react-exercise-name dev
```

Or navigate to the exercise directory:
```bash
cd exercises/react/exercise-name
pnpm dev
```

## Creating a New React Exercise

1. **Scaffold with Vite:**
   ```bash
   cd exercises/react
   pnpm create vite@latest my-new-app --template react
   # Or for TypeScript: --template react-ts
   ```

2. **Update the package name:**
   ```bash
   cd my-new-app
   ```
   
   Edit `package.json` and change the name:
   ```json
   {
     "name": "@code-playground/react-my-new-app"
   }
   ```

3. **Install and run:**
   ```bash
   cd ../../..  # Back to repo root
   pnpm install
   pnpm --filter @code-playground/react-my-new-app dev
   ```

That's it! Start coding in `src/App.jsx` (or `App.tsx`).

## React Exercise Tips

- ✅ **DO:** Use modern React hooks (useState, useEffect, etc.)
- ✅ **DO:** Leverage Vite's HMR for instant updates
- ✅ **DO:** Keep components focused and reusable
- ✅ **DO:** Use CSS modules or styled-components for scoped styles
- ❌ **DON'T:** Install heavy libraries unless necessary
- ❌ **DON'T:** Over-engineer simple exercises
- ❌ **DON'T:** Commit node_modules (already in .gitignore)

## Scripts Available

All React exercises include these scripts:

- `pnpm dev` - Start development server with HMR (usually http://localhost:5173)
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally

## Common Use Cases

### Practice Hooks
- useState, useEffect, useReducer
- Custom hooks
- Context API

### UI Components
- Forms and validation
- Modal dialogs
- Data tables
- Drag and drop

### API Integration
- Fetch data from APIs
- Loading states
- Error handling

### Routing
- Add `react-router-dom` for multi-page apps
- Practice navigation patterns

---

Happy coding with React! ⚛️

