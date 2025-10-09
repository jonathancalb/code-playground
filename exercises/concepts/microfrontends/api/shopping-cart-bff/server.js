import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// BFF Interceptor - logs all requests
app.use((req, res, next) => {
  console.log(`[Cart BFF Interceptor] ${req.method} ${req.path}`);
  console.log('[Cart BFF Interceptor] Auth:', req.headers.authorization);
  next();
});

// Shopping cart specific endpoints
app.post('/api/cart/checkout', (req, res) => {
  console.log('[Cart BFF] Checkout request:', req.body);
  // In real scenario: call payment service, inventory service, etc
  res.json({ 
    orderId: `ORD-${Date.now()}`, 
    status: 'success',
    message: 'Order placed successfully' 
  });
});

app.post('/api/cart/save', (req, res) => {
  console.log('[Cart BFF] Save cart:', req.body);
  res.json({ status: 'saved' });
});

app.listen(PORT, () => {
  console.log(`🛒 Shopping Cart BFF on http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log('  POST /api/cart/checkout');
  console.log('  POST /api/cart/save');
});

