import { useState, useEffect } from 'react';
// Import services from shared services MF
import { httpInterceptor } from 'sharedServices/httpInterceptor';
import eventBus from 'sharedServices/eventBus';

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = eventBus.on('addToCart', (product) => {
      console.log('[ShoppingCart] Received addToCart:', product);
      setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item =>
            item.id === product.id 
              ? { ...item, qty: item.qty + 1 } 
              : item
          );
        }
        return [...prev, { ...product, qty: 1 }];
      });
    });

    return unsubscribe;
  }, []);

  const checkout = async () => {
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    
    try {
      const res = await httpInterceptor.request('http://localhost:3002/api/cart/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart, total })
      });
      
      const result = await res.json();
      alert(`Order placed! Order ID: ${result.orderId}`);
      setCart([]);
      setError(null);
    } catch (err) {
      console.error('[ShoppingCart] Checkout error:', err.message);
      setError(err.message);
    }
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ border: '2px solid green', padding: '10px', margin: '10px' }}>
      <h2>Shopping Cart (Port 5002)</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {cart.length === 0 ? (
        <p>Empty</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} x{item.qty} = ${item.price * item.qty}
              </li>
            ))}
          </ul>
          <p><strong>Total: ${total}</strong></p>
          <button onClick={checkout}>Checkout</button>
        </>
      )}
    </div>
  );
}

