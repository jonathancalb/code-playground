# Exercise: Staged Authentication (Cookies → JWT) with Express + JSON + React

## Goal
Practice authentication by implementing two approaches:
1) **Cookies + Sessions (stateful)**
2) **JWT (stateless)**
Using a "database" in `data/users.json`, starting with **basic HTML views** and ending with **React**.

## Requirements
- Node 18+
- Express
- `data/users.json` as disk storage
- Basic validations (valid email, password ≥ 6)
- Don't leak whether failure is due to email or password (`invalid credentials`)
- **From the start:** authorization middleware to access protected pages (e.g., `/profile`)

---

## Stage 1 — Login with **Cookies + Sessions**
**Goal:** Implement login and a protected route using **sessions**.

### Tasks
- `POST /api/login`  
  - Body: `{ "email": "...", "password": "..." }`  
  - Normalize email (trim + lowercase)  
  - If ok, create session and set **httpOnly cookie** with `sessionId`  
  - `200 { "message": "logged-in" }`; failure → `401 { "message": "invalid credentials" }`
- `GET /api/profile` (protected by **session middleware**)  
  - Requires valid session  
  - `200 { "id","name","email" }` or `401`
- `POST /api/logout`  
  - Invalidate session → `204`
- **Basic HTML views** (no React yet)
  - `/login` with form (email/password) that POSTs to `/api/login`
  - `/profile` shows data if session exists; otherwise, middleware should **redirect 302 to `/login`**

### Acceptance Criteria
- After `login`, cookie is sent and middleware allows access to `/profile`
- Without session → `/profile` redirects 302 to `/login`

---

## Stage 2 — **Signup** (keeping Cookies + Sessions)
**Goal:** Add registration while maintaining the **sessions** approach.

### Tasks
- `POST /api/register`  
  - Body: `{ "name","email","password" }`  
  - Unique email (`409` if exists)  
  - Save `{ id,name,email,passwordHash }` to `users.json`  
  - `201 { id,name,email }`
- Keep login/logout/profile unchanged (cookies + middleware)
- **Basic HTML views**
  - `/register` with form that POSTs to `/api/register`
  - Happy path: after registering, redirect to `/login` or auto-login and go to `/profile`

### Acceptance Criteria
- Registering a user allows login and access to `/profile`
- Duplicate email → `409`

---

## Stage 3 — **Migration to JWT** (stateless)
**Goal:** Replace sessions with **JWT** (maintain endpoint semantics and page gating).

### Required Changes
- **API**
  - `/api/login`: return `200 { "message":"logged-in","token":"..." }` (JWT with `{ sub, email, name }` and expiration, e.g. 30m)
  - `/api/profile`: require `Authorization: Bearer <token>`; invalid/absent → `401`
  - `/api/logout`: `204` (no server-side state)
- **Page Protection (middleware from the start)**
  - Maintain **protection of pages served by Express**. You have two valid options to practice:
    - **Option A (JWT in httpOnly cookie)**: store JWT in httpOnly cookie and validate in middleware for `/profile` (server can read it).  
    - **Option B (API-only + client guard)**: middleware protects only API; for pages, serve HTML and let client redirect if no token (this option will be used more in Stage 4 with React).
  - For this exercise, **implement Option A** to continue using page middleware.

### Acceptance Criteria
- `profile` (API) responds `200` only with valid JWT
- Accessing `/profile` as page without valid cookie/token → redirects to `/login`
- `login` no longer sets session; now delivers JWT (and, if using Option A, stores it in httpOnly cookie)

---

## Stage 4 — **Migrate views to React** (maintaining authorization via middleware)
**Goal:** Replace basic HTML pages with a **React** app for views, **without breaking** page access authorization.

### Scope
- Create a **React SPA** (e.g., in `web/`) with routes:
  - `/login` (login form)
  - `/register` (signup form)
  - `/profile` (protected view)
- **Maintain page authorization middleware**:  
  - If you chose **Option A** in Stage 3 (JWT in httpOnly cookie), the **server middleware** should continue requiring valid cookie to serve `/profile` (or `/app` + subroutes).
  - Alternative to practice (optional): serve React without page gating and use **client route guard** that checks token and redirects to `/login`. **Even so**, the **API** must remain protected by JWT (server).

### Tasks
- **Structure**
  - `web/` with React (Vite/Next or similar). Build to `dist/` and **serve static files from Express**
  - React Router for client-side routing
- **Components**
  - Login form that POSTs to `/api/login`
  - Register form that POSTs to `/api/register`
  - Profile page that fetches from `/api/profile`
- **Authorization**
  - Option A: Server middleware continues protecting pages
  - Option B: Client guard redirects; server only protects API

### Acceptance Criteria
- React app replaces HTML views
- Authorization still works (middleware or client guard)
- Login/register/profile flow works end-to-end

---

## Running this exercise

From the **root** of the monorepo:
```bash
pnpm install  # First time only
pnpm --filter @code-playground/nodejs-authentication start
```

Or navigate to this directory:
```bash
cd exercises/nodejs/authentication
pnpm install  # First time only
pnpm start
```

## Available Scripts

- `pnpm start` - Run the server
- `pnpm dev` - Watch mode (auto-restart on file changes)

## What You'll Practice

- Express.js server setup
- Cookie-based sessions vs JWT
- Password hashing with bcrypt
- Authentication middleware
- Protected routes
- API design
- React integration
- Full-stack authentication flow
