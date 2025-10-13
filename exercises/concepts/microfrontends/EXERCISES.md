# Microfrontends - Hands-On Exercises

This document contains practical exercises and tasks to deepen your understanding of microfrontends architecture.

## 🏗️ Current Architecture Overview

### Shared Services Microfrontend (Port 5003)
The project now uses a dedicated **shared services microfrontend** that provides:

- **EventBus**: Cross-microfrontend communication using CustomEvents
- **HTTP Interceptor**: Centralized request handling with error management

### Architecture Benefits
- **Single Source of Truth**: All microfrontends use the same event bus and HTTP interceptor
- **Consistency**: Shared logging, error handling, and communication patterns
- **Maintainability**: Updates to shared services automatically propagate to all microfrontends
- **Module Federation**: Services are loaded as remote modules, not duplicated code

### Current Setup
```
┌─────────────────────────────────────────────────────────────┐
│                    Host (Port 5000)                         │
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
           │                       │
           ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│ Product BFF     │    │ Shopping BFF    │
│   Port: 3001    │    │   Port: 3002    │
└─────────────────┘    └─────────────────┘
```

## 🧪 What to Try (Interactive Exploration)

### 1. Browser Console Exploration
Open your browser's developer console and look for these logs:

- `[EventBus] Instance created in SHARED SERVICES MF`
- `[HTTP Interceptor] Request: ...`
- `[HTTP Interceptor] Success: 200`

### 2. Event Bus Communication
1. Click "Add" on any product
2. Watch the console logs:
   - `[ProductCatalog] Emitting addToCart`
   - `[ShoppingCart] Received addToCart`
3. Observe the cart updates in real-time

### 3. BFF Terminal Monitoring
1. Check your BFF terminals (ports 3001, 3002)
2. Look for intercepted requests
3. Notice headers being added (Authorization, etc)

### 4. Network Tab Analysis
1. Open Network tab in DevTools
2. Look for `remoteEntry.js` loaded from ports 5001, 5002, and 5003
3. See Module Federation in action (including shared services)

### 5. Error Handling Testing
1. Stop one of the BFFs
2. Try to add items to cart
3. Observe interceptor error messages
4. Check component error states

## 📝 Practical Exercises

### Beginner Level

#### Exercise 1: Add Error Boundary to Host
**Goal**: Implement error boundaries to gracefully handle component failures

**Tasks**:
1. Create an `ErrorBoundary` component in `app/host/src/`
2. Wrap remote components with the error boundary
3. Test by intentionally breaking a remote component
4. Ensure graceful fallback UI is shown

**Files to modify**:
- `app/host/src/ErrorBoundary.jsx` (new file)
- `app/host/src/App.jsx`

#### Exercise 2: Implement Loading States
**Goal**: Add loading indicators while remote components load

**Tasks**:
1. Add loading states for lazy-loaded components
2. Show skeleton UI or spinner while modules load
3. Handle loading failures gracefully

**Files to modify**:
- `app/host/src/App.jsx`
- `app/host/src/components/LoadingSpinner.jsx` (new file)

#### Exercise 3: Extend Shared Services
**Goal**: Add new shared functionality to the shared services microfrontend

**Tasks**:
1. Add a new shared utility (e.g., `localStorage` wrapper, `dateFormatter`)
2. Expose it through the shared services remote
3. Update host to import and use the new utility
4. Test that all microfrontends can access the new utility

**Files to modify**:
- `app/shared-services/src/` (add new utility)
- `app/shared-services/src/remoteEntry.js` (expose new utility)
- `app/host/src/App.jsx` (import and use new utility)

#### Exercise 4: Add TypeScript
**Goal**: Convert the project to TypeScript for better type safety

**Tasks**:
1. Install TypeScript dependencies
2. Convert `.jsx` files to `.tsx`
3. Add proper type definitions for props and state
4. Configure TypeScript for Module Federation

**Files to modify**:
- All `.jsx` files → `.tsx`
- Add `tsconfig.json` files
- Update `vite.config.js` for TypeScript support

### Intermediate Level

#### Exercise 4: Create Third Microfrontend (Header)
**Goal**: Add a new microfrontend to understand the pattern

**Tasks**:
1. Create `app/header/` directory
2. Implement a header component with navigation
3. Configure Module Federation to expose the header
4. Update host to consume the new microfrontend
5. Add communication between header and other microfrontends

**Files to create**:
- `app/header/src/Header.jsx`
- `app/header/src/main.jsx`
- `app/header/vite.config.js`
- `app/header/package.json`
- `app/header/index.html`

**Files to modify**:
- `app/host/src/App.jsx`
- `app/host/vite.config.js`

#### Exercise 5: Add Authentication Flow
**Goal**: Implement authentication across microfrontends

**Tasks**:
1. Create authentication microfrontend
2. Implement login/logout functionality
3. Share authentication state via event bus
4. Add protected routes
5. Implement token refresh logic

**Files to create**:
- `app/auth/src/Auth.jsx`
- `app/auth/src/LoginForm.jsx`
- `app/auth/src/ProtectedRoute.jsx`

**Files to modify**:
- `app/shared-services/src/eventBus.js` (add auth events)
- All microfrontends (add auth checks)

#### Exercise 6: Implement Retry Logic in Interceptor
**Goal**: Make HTTP requests more resilient

**Tasks**:
1. Add exponential backoff retry logic
2. Implement circuit breaker pattern
3. Add request timeout handling
4. Cache failed requests for retry

**Files to modify**:
- `app/shared-services/src/httpInterceptor.js`
- `app/product-catalog/src/ProductCatalog.jsx`
- `app/shopping-cart/src/ShoppingCart.jsx`

### Advanced Level

#### Exercise 7: Implement State Management
**Goal**: Add centralized state management across microfrontends

**Tasks**:
1. Implement Redux/Zustand store
2. Share state between microfrontends
3. Handle state synchronization
4. Implement optimistic updates

#### Exercise 8: Add Real-time Features
**Goal**: Implement WebSocket communication

**Tasks**:
1. Add WebSocket server
2. Implement real-time cart updates
3. Add live product inventory updates
4. Handle connection failures gracefully

#### Exercise 9: Performance Optimization
**Goal**: Optimize microfrontend loading and performance

**Tasks**:
1. Implement code splitting
2. Add lazy loading for routes
3. Optimize bundle sizes
4. Add performance monitoring

#### Exercise 10: Testing Strategy
**Goal**: Add comprehensive testing

**Tasks**:
1. Add unit tests for components
2. Implement integration tests
3. Add E2E tests for user flows
4. Test Module Federation behavior

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
│  ┌─────────────────────┐   ┌─────────────────────┐    │
│  │ <ProductCatalog/>   │   │ <ShoppingCart/>     │    │
│  └─────────────────────┘   └─────────────────────┘    │
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
