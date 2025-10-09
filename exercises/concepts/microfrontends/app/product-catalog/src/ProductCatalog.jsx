import { useState, useEffect } from 'react';

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.httpInterceptor.request('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setError(null);
      })
      .catch(err => {
        console.error('[ProductCatalog] Error:', err.message);
        setError(err.message);
      });
  }, []);

  const addToCart = (product) => {
    console.log('[ProductCatalog] Emitting addToCart:', product);
    window.eventBus.emit('addToCart', product);
  };

  if (error) {
    return (
      <div style={{ border: '2px solid blue', padding: '10px', margin: '10px' }}>
        <h2>Product Catalog (Port 5001)</h2>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ border: '2px solid blue', padding: '10px', margin: '10px' }}>
      <h2>Product Catalog (Port 5001)</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price}{' '}
            <button onClick={() => addToCart(p)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

