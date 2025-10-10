# Microfrontends - Core Concepts

Microfrontends using **React**, **Module Federation** (Vite), and **BFF pattern**. Shows HTTP interceptors, event bus communication, and shared dependencies.

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
│ - Interceptors  │                    │ - Interceptors  │
└─────────────────┘                    └─────────────────┘
        ↑                                       ↑
        │ HTTP                                  │ HTTP
        │                                       │
┌───────────────────────────────────────────────────────┐
│              Host (Port 5000)                         │
│  - Event Bus (CustomEvents)                           │
│  - Module Federation (loads remotes)                  │
│                                                       │
│  ┌─────────────────────┐   ┌─────────────────────┐   │
│  │ <ProductCatalog/>   │   │ <ShoppingCart/>     │   │
│  │   From :5001        │   │   From :5002        │   │
│  └─────────────────────┘   └─────────────────────┘   │
└───────────────────────────────────────────────────────┘
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
    │   │   ├── eventBus.js        # Event Bus (CustomEvents)
    │   │   └── main.jsx           # Entry point
    │   ├── vite.config.js         # Module Federation config
    │   ├── index.html
    │   └── package.json           # Port 5000, React dependency
    │
    ├── product-catalog/            # Product Catalog Frontend
    │   ├── src/
    │   │   ├── ProductCatalog.jsx # Component (exposed)
    │   │   └── main.jsx           # Standalone entry
    │   ├── httpInterceptor.js     # Error handling (401, 404, 500)
    │   ├── vite.config.js         # Exposes component
    │   ├── index.html
    │   └── package.json           # Port 5001, React dependency
    │
    └── shopping-cart/              # Shopping Cart Frontend
        ├── src/
        │   ├── ShoppingCart.jsx   # Component (exposed)
        │   └── main.jsx           # Standalone entry
        ├── vite.config.js         # Exposes component
        ├── index.html
        └── package.json           # Port 5002, React dependency
```

## 🚀 Quick Start

### Run Everything with One Command

```bash
# From root of monorepo
pnpm install
pnpm run microfrontends
```

This uses `concurrently` to run all services. **Important**: The host waits 5 seconds before starting to ensure remotes (5001, 5002) are ready and have generated their `remoteEntry.js` files.

Then visit: **http://localhost:5000**

### Or Run Manually (5 terminals)

```bash
# Terminal 1 - Product Catalog BFF (API)
cd exercises/concepts/microfrontends/api/product-catalog-bff
pnpm start

# Terminal 2 - Shopping Cart BFF (API)
cd exercises/concepts/microfrontends/api/shopping-cart-bff
pnpm start

# Terminal 3 - Product Catalog Frontend (APP)
cd exercises/concepts/microfrontends/app/product-catalog
pnpm dev

# Terminal 4 - Shopping Cart Frontend (APP)
cd exercises/concepts/microfrontends/app/shopping-cart
pnpm dev

# Terminal 5 - Host (APP)
cd exercises/concepts/microfrontends/app/host
pnpm dev
```

### Access Points

- **Host**: http://localhost:5000 (composed app)
- **Product Catalog**: http://localhost:5001 (standalone)
- **Shopping Cart**: http://localhost:5002 (standalone)
- **Product BFF**: http://localhost:3001/api/products
- **Cart BFF**: http://localhost:3002/api/cart/checkout

⚠️ **Order matters**: API (BFFs) → APP (Frontends) → APP (Host)

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

### 2. HTTP Interceptor with Error Handling

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

### 3. Event Bus Communication

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

### 4. BFF Pattern - Each Frontend Has Its Own Backend

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

### Event Bus
- **CustomEvents API**: Browser-native event system
- **Same page**: All apps in same DOM (unlike postMessage)
- **Centralized**: Host provides shared event bus
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
   - `[EventBus] Instance created in HOST`
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
   - `remoteEntry.js` loaded from :5001 and :5002
   - Module Federation in action

5. **Test error handling**:
   - Stop BFF → see interceptor error messages
   - Check component error states

## 🐛 Common Issues

**"Failed to fetch dynamically imported module"** or **"Failed to fetch remoteEntry.js"**
- **Cause**: Host starts before remotes are ready
- **Solution**: 
  - If using single command: The script has a 5-second delay built-in
  - If manual: Ensure remotes (5001, 5002) fully start BEFORE host (5000)
  - Wait for "ready in X ms" message from remotes before starting host

**CORS errors**
- Solution: BFFs use `cors()` middleware

**React version mismatch**
- Solution: All apps use same React version in package.json

## 📝 Exercises

1. Add error boundary to host
2. Implement loading states
3. Add TypeScript
4. Create third microfrontend (e.g., Header)
5. Add authentication flow
6. Implement retry logic in interceptor

---

## 🚀 Advanced: Evolution to Microservices with GraphQL BFF

### Next Step: Replace Multiple BFFs with GraphQL Aggregation Layer

The current architecture has **separate BFFs** for each microfrontend. As your system grows, you can evolve to use **GraphQL as a unified BFF layer** that aggregates multiple microservices.

### Current Architecture (Multiple BFFs)

```
┌─────────────────┐                    ┌─────────────────┐
│ Product BFF     │                    │ Shopping BFF    │
│   Port: 3001    │                    │   Port: 3002    │
└─────────────────┘                    └─────────────────┘
        ↑                                       ↑
        │                                       │
┌───────────────────────────────────────────────────────┐
│              Host (Port 5000)                         │
│  ┌─────────────────────┐   ┌─────────────────────┐   │
│  │ <ProductCatalog/>   │   │ <ShoppingCart/>     │   │
│  └─────────────────────┘   └─────────────────────┘   │
└───────────────────────────────────────────────────────┘
```

### Evolved Architecture (GraphQL BFF + API Gateway)

```
┌─────────────────────────────┐
│      Microfrontends         │
│  (Product, Cart, Checkout)  │
└──────────────┬──────────────┘
               │
               │ GraphQL queries
               ▼
┌──────────────────────────────┐
│      GraphQL BFF Layer       │ ← Single aggregation point
│     (Apollo Server)          │    for all frontends
│                              │
│  Schema:                     │
│  - Products                  │
│  - Cart                      │
│  - Orders                    │
│  - Users                     │
└──────────────┬───────────────┘
               │
               │ HTTP/gRPC
               ▼
┌──────────────────────────────┐
│       API Gateway            │ ← Resilience layer
│   (Kong, AWS Gateway, or     │
│    built-in patterns)        │
│                              │
│  • Circuit Breaker           │
│  • Request/Response Cache    │
│  • Rate Limiting             │
│  • Load Balancing            │
│  • Retry Logic               │
│  • Health Checks             │
│  • Timeout Handling          │
└────┬──────────┬──────────┬───┘
     │          │          │
     │          │          │ Internal network
     ▼          ▼          ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│Product  │ │  Cart   │ │ Order   │
│Service  │ │ Service │ │ Service │
│:4001    │ │ :4002   │ │ :4003   │
└─────────┘ └─────────┘ └─────────┘
```

### Why Evolve to GraphQL BFF?

**Problems with Multiple BFFs:**
- Each frontend calls different endpoints
- Overfetching (getting too much data)
- Underfetching (need multiple requests)
- Hard to coordinate changes across BFFs
- Duplicate logic (auth, caching, error handling)

**Benefits of GraphQL BFF:**
- **Single query** fetches all needed data
- Frontend controls exactly what data it needs
- **Reduced network requests** (N queries → 1 query)
- **Strong typing** with GraphQL schema
- **Real-time updates** with subscriptions
- **Easier versioning** (no breaking changes)

### What About Resilience, Caching, and Downtime?

You have **three main approaches**:

#### **Option A: API Gateway Between GraphQL BFF and Microservices**

Add a dedicated **API Gateway** (Kong, AWS API Gateway, Tyk) that handles:
- **Circuit Breaker**: Stop calling failing services, return cached/default responses
- **Caching**: Cache responses from microservices (Redis, in-memory)
- **Rate Limiting**: Protect microservices from overload
- **Load Balancing**: Distribute requests across service instances
- **Retry Logic**: Automatically retry failed requests
- **Health Checks**: Monitor service availability
- **Request/Response Transformation**: Adapt protocols if needed

**Pros:**
- Centralized cross-cutting concerns
- Microservices stay simple and focused
- Easy to add new patterns without changing services
- Can be managed by infrastructure/DevOps team

**Cons:**
- Additional network hop (latency)
- Another component to manage and deploy
- Potential single point of failure (needs HA setup)

#### **Option B: GraphQL BFF Implements Resilience Directly**

The GraphQL BFF itself implements these patterns:

```javascript
// Example: Circuit Breaker in GraphQL resolver
import CircuitBreaker from 'opossum';
import Redis from 'ioredis';

const redis = new Redis();

// Circuit breaker for Product Service
const productServiceBreaker = new CircuitBreaker(callProductService, {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
});

// GraphQL resolver with resilience
const resolvers = {
  Query: {
    products: async () => {
      const cacheKey = 'products:all';
      
      // Check cache first
      const cached = await redis.get(cacheKey);
      if (cached) return JSON.parse(cached);
      
      try {
        // Call service through circuit breaker
        const result = await productServiceBreaker.fire({
          method: 'GET',
          url: 'http://product-service:4001/api/products'
        });
        
        // Cache successful response
        await redis.setex(cacheKey, 60, JSON.stringify(result));
        return result;
        
      } catch (error) {
        if (productServiceBreaker.opened) {
          // Circuit open: return fallback/cached data
          const fallback = await redis.get(`${cacheKey}:fallback`);
          return fallback ? JSON.parse(fallback) : [];
        }
        throw error;
      }
    },
    
    cart: async (_, { userId }) => {
      // Similar pattern for cart service
      try {
        const result = await cartServiceBreaker.fire({
          method: 'GET',
          url: `http://cart-service:4002/api/cart/${userId}`
        });
        return result;
      } catch (error) {
        // Handle downtime gracefully
        return { items: [], total: 0, error: 'Cart temporarily unavailable' };
      }
    }
  }
};
```

**Pros:**
- No extra network hop (better latency)
- Full control over behavior per endpoint
- Simpler deployment (fewer moving parts)
- Faster development iteration

**Cons:**
- GraphQL BFF becomes more complex
- Need to implement patterns for each resolver
- Mixed responsibilities (aggregation + resilience)

#### **Option C: Service Mesh (Advanced)**

Use **Istio, Linkerd, or Consul Connect** for service-to-service communication:
- Traffic management handled at infrastructure level
- Circuit breaking, retries, timeouts configured via YAML
- Automatic mTLS between services
- Distributed tracing built-in
- No code changes needed

**Best for:** Large-scale microservices (10+ services), Kubernetes deployments

### Implementation Steps

#### 1. Extract Backend Services from BFFs

Split current BFFs into focused microservices:

**Product Service** (Port 4001)
```javascript
// Focused on product data only
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  res.json(product);
});
```

**Cart Service** (Port 4002)
```javascript
// Focused on cart operations
app.get('/api/cart/:userId', (req, res) => {
  res.json(cart);
});

app.post('/api/cart/add', (req, res) => {
  // Add item logic
});
```

**Order Service** (Port 4003)
```javascript
// Focused on checkout/orders
app.post('/api/orders/create', (req, res) => {
  // Create order logic
});
```

#### 2. Create GraphQL BFF Layer (Port 4000)

**GraphQL Schema:**
```graphql
type Product {
  id: ID!
  name: String!
  price: Float!
  image: String
}

type CartItem {
  product: Product!
  quantity: Int!
}

type Cart {
  items: [CartItem!]!
  total: Float!
}

type Order {
  id: ID!
  items: [CartItem!]!
  total: Float!
  status: String!
  createdAt: String!
}

type Query {
  products: [Product!]!
  product(id: ID!): Product
  cart(userId: ID!): Cart
  orders(userId: ID!): [Order!]!
}

type Mutation {
  addToCart(userId: ID!, productId: ID!, quantity: Int!): Cart
  removeFromCart(userId: ID!, productId: ID!): Cart
  checkout(userId: ID!): Order
}

# Optional: Real-time updates
type Subscription {
  cartUpdated(userId: ID!): Cart
  orderStatusChanged(orderId: ID!): Order
}
```

**GraphQL Server Setup:**
```javascript
// server.js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import CircuitBreaker from 'opossum';
import Redis from 'ioredis';
import axios from 'axios';

const redis = new Redis();

// Circuit breakers for each service
const productBreaker = new CircuitBreaker(
  async (url) => axios.get(url),
  { timeout: 3000, errorThresholdPercentage: 50 }
);

const cartBreaker = new CircuitBreaker(
  async (url, options) => axios(url, options),
  { timeout: 3000, errorThresholdPercentage: 50 }
);

// Resolvers with resilience
const resolvers = {
  Query: {
    products: async () => {
      const cacheKey = 'products:all';
      const cached = await redis.get(cacheKey);
      if (cached) return JSON.parse(cached);
      
      try {
        const { data } = await productBreaker.fire(
          'http://localhost:4001/api/products'
        );
        await redis.setex(cacheKey, 60, JSON.stringify(data));
        return data;
      } catch (error) {
        // Return cached fallback if service is down
        const fallback = await redis.get(`${cacheKey}:fallback`);
        return fallback ? JSON.parse(fallback) : [];
      }
    },
    
    cart: async (_, { userId }) => {
      try {
        const { data } = await cartBreaker.fire(
          `http://localhost:4002/api/cart/${userId}`
        );
        return data;
      } catch (error) {
        return { items: [], total: 0 };
      }
    }
  },
  
  Mutation: {
    addToCart: async (_, { userId, productId, quantity }) => {
      const { data } = await cartBreaker.fire(
        'http://localhost:4002/api/cart/add',
        {
          method: 'POST',
          data: { userId, productId, quantity }
        }
      );
      
      // Emit event for real-time updates (if using subscriptions)
      pubsub.publish('CART_UPDATED', { cartUpdated: data });
      
      return data;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
await startStandaloneServer(server, { port: 4000 });
```

#### 3. Update Microfrontends to Use GraphQL

**Install Apollo Client:**
```bash
cd app/product-catalog
pnpm add @apollo/client graphql
```

**Replace fetch with GraphQL:**
```javascript
// ProductCatalog.jsx
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      image
    }
  }
`;

function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div>
      {data.products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductCatalog() {
  return (
    <ApolloProvider client={client}>
      <ProductList />
    </ApolloProvider>
  );
}
```

**Shopping Cart with Mutation:**
```javascript
// ShoppingCart.jsx
const ADD_TO_CART = gql`
  mutation AddToCart($userId: ID!, $productId: ID!, $quantity: Int!) {
    addToCart(userId: $userId, productId: $productId, quantity: $quantity) {
      items {
        product { id name price }
        quantity
      }
      total
    }
  }
`;

function Cart({ userId }) {
  const [addToCart] = useMutation(ADD_TO_CART);
  
  const handleAddItem = async (productId) => {
    try {
      await addToCart({
        variables: { userId, productId, quantity: 1 }
      });
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };
  
  return (
    // Cart UI
  );
}
```

### Recommended Packages for Resilience

**Circuit Breaker:**
```bash
pnpm add opossum  # Circuit breaker pattern
```

**Caching:**
```bash
pnpm add ioredis  # Redis client (distributed cache)
# OR
pnpm add node-cache  # In-memory cache (simpler)
```

**Retry Logic:**
```bash
pnpm add async-retry  # Automatic retries with backoff
```

**HTTP Client with Timeout:**
```bash
pnpm add axios  # Better timeout handling than fetch
```

### Acceptance Criteria

**Basic Functionality:**
- ✅ Microservices run independently (different ports)
- ✅ GraphQL BFF successfully aggregates data from all services
- ✅ Single GraphQL query fetches products + cart + orders
- ✅ Microfrontends use GraphQL client instead of direct REST calls
- ✅ Each microservice can be developed/deployed independently

**Resilience & Performance:**
- ✅ **Circuit Breaker**: When a service is down, GraphQL returns fallback response
- ✅ **Caching**: Repeated queries return cached data (faster response)
- ✅ **Retry Logic**: Transient failures are retried automatically
- ✅ **Timeout Handling**: Long-running requests are aborted gracefully
- ✅ **Health Monitoring**: GraphQL BFF checks service health before calling

**Testing Resilience:**
- Stop Product Service → Circuit opens → BFF returns cached/fallback data
- Restart Product Service → Circuit closes after health checks pass
- Verify cache reduces response time for repeated queries
- Cart still works when Product Service is down

### Optional Advanced Enhancements

**Infrastructure Layer:**
- Add **API Gateway** (Kong, Tyk, AWS API Gateway) for centralized resilience
- Implement **Service Mesh** (Istio, Linkerd, Consul) for automatic service-to-service patterns
- Use **gRPC** between GraphQL BFF and microservices for better performance
- Add **Load Balancer** (nginx, HAProxy) for high availability

**Observability:**
- Implement **distributed tracing** (Jaeger, Zipkin, OpenTelemetry)
- Add **metrics collection** (Prometheus + Grafana)
- Set up **centralized logging** (ELK stack, Loki)
- Create **dashboards** for circuit breaker state, cache hit rates

**Advanced Patterns:**
- Add **message queue** (RabbitMQ, Kafka) for async operations
- Implement **saga pattern** for distributed transactions
- Use **event sourcing** for audit trail
- Add **rate limiting** per user/IP (using Redis)
- Implement **GraphQL subscriptions** for real-time updates

---

**Stack**: React + Vite + Module Federation + Express + GraphQL + Apollo + pnpm 🎯
