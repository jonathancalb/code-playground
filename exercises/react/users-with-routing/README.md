# Exercise: User List with Routing and State Management

Build a React application that displays a list of users, implements routing for user details, and manages shared state efficiently.

## Running this exercise

From the **root** of the monorepo:
```bash
pnpm install  # First time only
pnpm --filter @code-playground/react-users-with-routing dev
```

Or navigate to this directory:
```bash
cd exercises/react/users-with-routing
pnpm install  # First time only
pnpm dev
```

The app will open at http://localhost:5173

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

---

## Stage 1 — User List from JSON

**Goal:** Display a list of users loaded from a JSON file.

### Tasks
- Create a `public/users.json` file with user data:
  ```json
  {
    "data": [
      { "id": "1", "name": "Alice Johnson" },
      { "id": "2", "name": "Bob Smith" },
      { "id": "3", "name": "Charlie Brown" }
    ]
  }
  ```
- Fetch the users in your component using `fetch()` and `useEffect`
- Display the list of user names on the home page (`/`)

### Acceptance Criteria
- Users are loaded from `public/users.json`
- User names are displayed on the screen
- No routing yet, just a simple list

---

## Stage 2 — Add Routing

**Goal:** Implement React Router so each user links to their detail page.

### Tasks
- Install `react-router-dom`:
  ```bash
  pnpm add react-router-dom
  ```
- Set up `BrowserRouter` with routes:
  - `/` - Home page (user list)
  - `/user/:id` - User detail page
- Convert each user name in the list to a `<Link>` that navigates to `/user/:id`
- Create a user detail page that shows the user's information
- Use `useParams()` to get the `id` from the URL
- Fetch users again in the detail page to find the matching user

### Acceptance Criteria
- Clicking a user name navigates to `/user/:id`
- The detail page shows the correct user's name
- Back button works correctly

### Problem to Notice
At this point, you're **fetching the users twice**: once on the home page and once on the detail page. This is inefficient!

---

## Stage 3A — Share Data with Context

**Goal:** Avoid duplicate fetching by sharing user data across routes using Context API.

### Tasks
- Create a `useUsers` custom hook with Context:
  ```tsx
  // hooks/useUsers.ts
  const UsersContext = createContext<User[]>([])
  export const UsersProvider = UsersContext.Provider
  export const useUsers = () => useContext(UsersContext)
  ```
- Fetch users at the **top level** (in `main.tsx` or a wrapper component)
- Wrap your app with `<UsersProvider value={users}>`
- Use the `useUsers()` hook in both the home page and detail page
- Remove duplicate fetch calls

### Acceptance Criteria
- Users are fetched **only once** at the app level
- Both routes use `useUsers()` to access the data
- No duplicate network requests

---

## Stage 3B — Refactor to Layout Pattern

**Goal:** Learn an alternative pattern using layouts and `Outlet`.

### Tasks
- Create a `UsersLayout` component
- Move the user fetching logic from top level to `UsersLayout`
- In `UsersLayout`, provide users via Context and render `<Outlet />`
- Update your routes to use the layout:
  ```tsx
  <Route path="/" element={<UsersLayout />}>
    <Route index element={<HomePage />} />
    <Route path="/user/:id" element={<UserDetailPage />} />
  </Route>
  ```

### Acceptance Criteria
- Users are fetched in `UsersLayout`
- Both child routes access users via `useUsers()`
- The layout pattern keeps data loading close to the routes that need it

### Compare Both Approaches
- **Context (Stage 3A):** Global data, fetch at app root
- **Layout (Stage 3B):** Scoped data, fetch at layout level
- Both are valid! Layouts are better when data is only needed for specific route groups.

---

## Stage 4 — Add/Remove Users with useReducer

**Goal:** Add functionality to create and delete users, managing state with `useReducer`.

### Tasks
- Migrate from `useState` to `useReducer` for managing the user list
- Create a reducer with actions:
  - `ADD_USER` - Add a new user
  - `REMOVE_USER` - Remove a user by id
- Add a form on the home page to create new users (name input + submit button)
- Add a "Delete" button on the user detail page
- After deleting, navigate back to home
- Dispatch actions through the Context (provide both `users` and `dispatch`)

### Example Reducer
```tsx
type Action = 
  | { type: 'ADD_USER', payload: { name: string } }
  | { type: 'REMOVE_USER', payload: { id: string } }

function usersReducer(state: User[], action: Action): User[] {
  switch (action.type) {
    case 'ADD_USER':
      // implement
    case 'REMOVE_USER':
      // implement
    default:
      return state
  }
}
```

### Acceptance Criteria
- Can add new users through a form
- New users appear in the list immediately
- Can delete users from the detail page
- After deletion, redirects to home
- State is managed with `useReducer`

---

## What You'll Learn

- **React Router v6**: Navigation, nested routes, URL parameters
- **Context API**: Sharing state across components
- **Custom Hooks**: Encapsulating reusable logic
- **Layout Pattern**: Data fetching at the right level
- **useReducer**: Complex state management
- **TypeScript**: Type-safe React components
- **Component Composition**: Building apps with reusable pieces

## Key Concepts

### Fetching Data in React
```tsx
const [users, setUsers] = useState<User[]>([])

useEffect(() => {
  fetch('/users.json')
    .then(res => res.json())
    .then(data => setUsers(data.data))
}, [])
```

### Context API
```tsx
const UsersContext = createContext<User[]>([])
export const useUsers = () => useContext(UsersContext)

// Provider
<UsersProvider value={users}>
  {children}
</UsersProvider>

// Consumer
const users = useUsers()
```

### React Router with Layouts
```tsx
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path="/user/:id" element={<Detail />} />
</Route>

// In Layout component
<Outlet /> {/* Child routes render here */}
```

### useReducer for State Management
```tsx
const [users, dispatch] = useReducer(usersReducer, initialUsers)

// Dispatch actions
dispatch({ type: 'ADD_USER', payload: { name: 'New User' } })
dispatch({ type: 'REMOVE_USER', payload: { id: '123' } })
```

## Tips

- Start simple: get it working with basic `useState` before refactoring
- Compare Context vs Layout patterns - both are valid!
- `useReducer` is better than `useState` when state updates are complex
- Use TypeScript to catch errors early
- Keep components focused on one responsibility

## Extension Ideas

- Add user editing functionality
- Implement search/filter
- Add form validation
- Persist changes to localStorage
- Add loading and error states
- Implement optimistic updates
- Add user avatars
- Create a "not found" page for invalid user IDs
