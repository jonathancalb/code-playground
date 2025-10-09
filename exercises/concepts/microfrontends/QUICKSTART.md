# 🚀 Quick Start - Microfrontends

## Install Dependencies

```bash
# From root
pnpm install
```

## Option 1: Run Everything with One Command (Recommended)

```bash
# From root of monorepo
pnpm run microfrontends
```

This will start (in order):
1. **BFFs** (ports 3001, 3002) - immediately
2. **Remotes** (ports 5001, 5002) - immediately 
3. **Host** (port 5000) - after 5 seconds (waits for remotes)

The 5-second delay ensures remotes generate `remoteEntry.js` before host loads them.

Then visit: **http://localhost:5000**

## Option 2: Run Manually (5 terminals in order)

```bash
# Terminal 1 - Product Catalog BFF
cd api/product-catalog-bff
pnpm start

# Terminal 2 - Shopping Cart BFF
cd api/shopping-cart-bff
pnpm start

# Terminal 3 - Product Catalog Frontend (MUST run before host)
cd app/product-catalog
pnpm dev

# Terminal 4 - Shopping Cart Frontend (MUST run before host)
cd app/shopping-cart
pnpm dev

# Terminal 5 - Host
cd app/host
pnpm dev
```

## URLs

- **Host**: http://localhost:5000 (composed app)
- **Product Catalog**: http://localhost:5001 (standalone)
- **Shopping Cart**: http://localhost:5002 (standalone)

## ⚠️ Important

1. **Start BFFs first** (3001, 3002)
2. **Start remotes BEFORE host** (5001, 5002 before 5000)
3. Module Federation requires remotes to be running

## 🎯 What to Check

1. **Browser console** → Event Bus logs, HTTP interceptor errors
2. **Network tab** → See remoteEntry.js loaded from :5001 and :5002
3. **BFF terminals** → API request logs with headers
4. **Click "Add"** → Product Catalog emits → Shopping Cart receives

## 🔧 Key Files

- `app/*/vite.config.js` - Module Federation configuration
- `app/product-catalog/httpInterceptor.js` - Error handling
- `app/host/src/eventBus.js` - Cross-app communication

---

📖 [Full README](./README.md)
