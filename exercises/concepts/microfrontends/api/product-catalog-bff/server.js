import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// BFF Interceptor - logs all requests
app.use((req, res, next) => {
  console.log(`[Product BFF Interceptor] ${req.method} ${req.path}`);
  console.log('[Product BFF Interceptor] Auth:', req.headers.authorization);
  next();
});

// Mock product data (in real app, would fetch from microservices)
const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Phone', price: 699 },
  { id: 3, name: 'Mouse', price: 29 },
];

// Product-specific endpoints
app.get('/api/products', (req, res) => {
  console.log('[Product BFF] Returning products');
  // In real scenario: aggregate data from multiple microservices
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(PORT, () => {
  console.log(`📦 Product Catalog BFF on http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log('  GET /api/products');
  console.log('  GET /api/products/:id');
});

