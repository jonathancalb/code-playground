# Microfrontends - Core Concepts

Microfrontends using **React**, **Module Federation** (Vite), and **BFF pattern**. Shows HTTP interceptors, event bus communication, and **shared services microfrontend**.

## 🎯 Concepts You'll Learn

1. **Module Federation**: Load remote React components at runtime (Vite plugin)
2. **Shared Dependencies**: React installed in each microfrontend, but loaded once via Module Federation
3. **HTTP Interceptors**: Error handling for 401, 404, 500 status codes
4. **Event Bus**: Cross-app communication with CustomEvents  
5. **BFF Pattern**: Each microfrontend → its own backend API
6. **Independent Deployment**: Each app runs standalone with own React, or composed via Module Federation

## 🏗️ Architecture

```
┌─────────────────┐                    ┌─────────────────┐
│ Product BFF     │                    │ Shopping BFF    │
│   Port: 3001    │                    │   Port: 3002    │
│ - /api/products │                    │ - /api/checkout │
└─────────────────┘                    └─────────────────┘
        ↑                                       ↑
        │ HTTP                                  │ HTTP
        │                                       │
┌─────────────────────────────────────────────────────────────┐
│                    Host (Port 5000)                         │
│  - Module Federation (loads remotes)                        │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │ ProductCatalog  │  │ ShoppingCart    │                   │
│  │ (Port 5001)     │  │ (Port 5002)     │                   │
│  └─────────────────┘  └─────────────────┘                   │
│           │                       │                         │
│           └───────────┬───────────┘                         │
│                       │                                     │
│  ┌─────────────────────────────────────────────────────────┐│
│  │           Shared Services (Port 5003)                   ││
│  │  • EventBus (CustomEvents)                              ││
│  │  • HTTP Interceptor (Error handling)                    ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
            ↑                          ↑
            │ Module Federation        │
    ┌───────┴────────┐        ┌────────┴───────┐
    │ Product Catalog│        │ Shopping Cart  │
    │   Port: 5001   │        │   Port: 5002   │
    │ - Exposes comp │        │ - Exposes comp │
    │ - Calls BFF    │        │ - Calls BFF    │
    └────────────────┘        └────────────────┘
```

## 📁 Structure

```
microfrontends/
├── api/                            # Backend APIs (BFFs)
│   ├── product-catalog-bff/       # Product Catalog BFF
│   │   ├── server.js              # Express - product endpoints
│   │   └── package.json           # Port 3001
│   │
│   └── shopping-cart-bff/          # Shopping Cart BFF
│       ├── server.js              # Express - cart endpoints
│       └── package.json           # Port 3002
│
└── app/                            # Frontend Apps
    ├── host/                       # Shell/Container
    │   ├── src/
    │   │   ├── App.jsx            # Loads remote components
    │   │   └── main.jsx           # Entry point
    │   ├── vite.config.js         # Module Federation config
    │   ├── index.html
    │   └── package.json           # Port 5000, React dependency
    │
    ├── product-catalog/            # Product Catalog Frontend
    │   ├── src/
    │   │   ├── ProductCatalog.jsx # Component (exposed)
    │   │   └── main.jsx           # Standalone entry
    │   ├── vite.config.js         # Exposes component
    │   ├── index.html
    │   └── package.json           # Port 5001, React dependency
    │
    ├── shopping-cart/              # Shopping Cart Frontend
    │   ├── src/
    │   │   ├── ShoppingCart.jsx   # Component (exposed)
    │   │   └── main.jsx           # Standalone entry
    │   ├── vite.config.js         # Exposes component
    │   ├── index.html
    │   └── package.json           # Port 5002, React dependency
    │
    └── shared-services/            # Shared Services Microfrontend
        ├── src/
        │   ├── eventBus.js        # Event Bus (CustomEvents)
        │   ├── httpInterceptor.js # Error handling (401, 404, 500)
        │   └── remoteEntry.js     # Exposes shared services
        ├── vite.config.js         # Exposes services
        ├── index.html
        └── package.json           # Port 5003, React dependency
```

## 🚀 Quick Start

### Run Everything with One Command (Recommended)

```bash
# From microfrontends folder
cd exercises/concepts/microfrontends
pnpm install
pnpm start
```

This uses `concurrently` to run all services. **Important**: The host waits 3 seconds before starting to ensure remotes (5001, 5002) are ready and have generated their `remoteEntry.js` files.

Then visit: **http://localhost:5000**

### Or Run Manually (5 terminals in order)

```bash
# Terminal 1 - Product Catalog BFF (API)
cd exercises/concepts/microfrontends/api/product-catalog-bff
pnpm start

# Terminal 2 - Shopping Cart BFF (API)
cd exercises/concepts/microfrontends/api/shopping-cart-bff
pnpm start

# Terminal 3 - Shared Services Frontend (APP)
cd exercises/concepts/microfrontends/app/shared-services
pnpm dev

# Terminal 4 - Product Catalog Frontend (APP)
cd exercises/concepts/microfrontends/app/product-catalog
pnpm dev

# Terminal 5 - Shopping Cart Frontend (APP)
cd exercises/concepts/microfrontends/app/shopping-cart
pnpm dev

# Terminal 6 - Host (APP)
cd exercises/concepts/microfrontends/app/host
pnpm dev
```

### Access Points

- **Host**: http://localhost:5000 (composed app)
- **Product Catalog**: http://localhost:5001 (standalone)
- **Shopping Cart**: http://localhost:5002 (standalone)
- **Shared Services**: http://localhost:5003 (standalone)
- **Product BFF**: http://localhost:3001/api/products
- **Cart BFF**: http://localhost:3002/api/cart/checkout

⚠️ **Order matters**: API (BFFs) → APP (Shared Services) → APP (Frontends) → APP (Host)

## 🔧 How It Works

### 1. Module Federation with Shared React

**Each microfrontend** has React in `package.json`:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

**Module Federation config** shares React (tree shaking):
```javascript
// vite.config.js in each microfrontend
federation({
  name: 'productCatalog',
  exposes: {
    './ProductCatalog': './src/ProductCatalog'
  },
  shared: ['react', 'react-dom']  // ⭐ Only ONE instance loaded
})
```

**Host** imports remote components:
```javascript
const ProductCatalog = lazy(() => import('productCatalog/ProductCatalog'));
```

### 2. Shared Services Microfrontend (Port 5003)

**Host** imports shared services:
```javascript
// app/host/src/App.jsx
import eventBus from 'sharedServices/eventBus';
import { httpInterceptor } from 'sharedServices/httpInterceptor';

// Expose globally for remotes to use
window.eventBus = eventBus;
window.httpInterceptor = httpInterceptor;
```

**Shared Services** exposes utilities:
```javascript
// app/shared-services/src/remoteEntry.js
export { default as eventBus } from './eventBus';
export { httpInterceptor } from './httpInterceptor';
```

**Module Federation config** for shared services:
```javascript
// app/shared-services/vite.config.js
federation({
  name: 'sharedServices',
  exposes: {
    './eventBus': './src/eventBus',
    './httpInterceptor': './src/httpInterceptor'
  },
  shared: ['react', 'react-dom']
})
```

### 3. HTTP Interceptor with Error Handling

```javascript
export const httpInterceptor = {
  async request(url, options = {}) {
    const response = await fetch(url, options);
    
    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login');
      } else if (response.status === 404) {
        throw new Error('Resource not found');
      } else if (response.status >= 500) {
        throw new Error('Server error - Please try again later');
      }
    }
    
    return response;
  }
};
```

### 4. Event Bus Communication

**Product Catalog** emits:
```javascript
window.eventBus.emit('addToCart', product);
```

**Shopping Cart** listens:
```javascript
useEffect(() => {
  const unsubscribe = window.eventBus.on('addToCart', (product) => {
    setCart(prev => [...prev, product]);
  });
  return unsubscribe;
}, []);
```

### 5. BFF Pattern - Each Frontend Has Its Own Backend

**Product Catalog BFF** (Port 3001):
```javascript
// Product-specific endpoints
app.get('/api/products', (req, res) => {
  // Aggregate data from microservices
  res.json(products);
});
```

**Shopping Cart BFF** (Port 3002):
```javascript
// Cart-specific endpoints
app.post('/api/cart/checkout', (req, res) => {
  // Call payment, inventory services
  res.json({ orderId, status: 'success' });
});
```

**Key**: Each microfrontend calls ONLY its own BFF

## 💡 Key Concepts

### Microfrontends
- **Module Federation**: Vite plugin for runtime component loading
- **Shared React**: Installed in each, but Module Federation loads ONE instance
- **Tree Shaking**: Duplicate dependencies automatically removed
- **Independent**: Each can run standalone with `pnpm dev`
- **JSX Support**: Full Vite + React development experience
- **Type Safety**: Can add TypeScript if needed

### Shared Services Architecture
- **Dedicated Microfrontend**: EventBus and HTTP Interceptor in separate MF (Port 5003)
- **Module Federation**: Services loaded as remote modules, not duplicated code
- **Single Source of Truth**: All microfrontends use the same shared services
- **Consistency**: Shared logging, error handling, and communication patterns
- **Maintainability**: Updates to shared services automatically propagate to all microfrontends

### Event Bus
- **CustomEvents API**: Browser-native event system
- **Same page**: All apps in same DOM (unlike postMessage)
- **Centralized**: Shared services microfrontend provides event bus
- **Decoupled**: Microfrontends don't directly reference each other

### BFF Pattern
- **One BFF per frontend**: Each microfrontend has its own backend
- **Tailored APIs**: Endpoints specific to that frontend's needs
- **Data aggregation**: BFF combines multiple microservice calls
- **Independent scaling**: Scale BFFs based on frontend needs
- **Team ownership**: Frontend team owns both UI and BFF

### HTTP Interceptors
- **Automatic headers**: Auth tokens, tracking IDs
- **Error handling**: Centralized HTTP error logic (401, 404, 500)
- **Logging**: Request/response monitoring
- **Timing**: Performance monitoring

## 🧪 What to Try

1. **Browser console**:
   - `[EventBus] Instance created in SHARED SERVICES MF`
   - `[HTTP Interceptor] Request: ...`
   - `[HTTP Interceptor] Success: 200`

2. **Click "Add"**:
   - `[ProductCatalog] Emitting addToCart`
   - `[ShoppingCart] Received addToCart`
   - Cart updates in real-time

3. **BFF terminals**:
   - See intercepted requests
   - Headers added (Authorization, etc)

4. **Network tab**:
   - `remoteEntry.js` loaded from :5001, :5002, and :5003
   - Module Federation in action (including shared services)

5. **Test error handling**:
   - Stop BFF → see interceptor error messages
   - Check component error states

## 🐛 Common Issues

**"Failed to fetch dynamically imported module"** or **"Failed to fetch remoteEntry.js"**
- **Cause**: Host starts before remotes are ready
- **Solution**: 
  - If using single command: The script has a 5-second delay built-in
  - If manual: Ensure remotes (5003, 5001, 5002) fully start BEFORE host (5000)
  - Wait for "ready in X ms" message from remotes before starting host
  - Start shared services (5003) first, then other microfrontends

**CORS errors**
- Solution: BFFs use `cors()` middleware

**React version mismatch**
- Solution: All apps use same React version in package.json

## 📚 Learning Resources

- **[EXERCISES.md](./EXERCISES.md)** - Hands-on exercises and practical tasks

---

**Stack**: React + Vite + Module Federation + Express + pnpm 🎯
