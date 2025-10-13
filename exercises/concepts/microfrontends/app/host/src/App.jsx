import { lazy, Suspense } from 'react';

// Module Federation - load remote components
const ProductCatalog = lazy(() => import('productCatalog/ProductCatalog'));
const ShoppingCart = lazy(() => import('shoppingCart/ShoppingCart'));

export default function App() {
  return (
    <div style={{ border: '2px solid red', padding: '10px', margin: '10px' }}>
      <h1>Host App (Port 5000) - Shell</h1>
      
      <Suspense fallback={<div>Loading Product Catalog...</div>}>
        <ProductCatalog />
      </Suspense>

      <Suspense fallback={<div>Loading Shopping Cart...</div>}>
        <ShoppingCart />
      </Suspense>

      <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
        <h3>Concepts:</h3>
        <ul>
          <li><strong>Module Federation</strong>: Remote components loaded at runtime</li>
          <li><strong>Shared React</strong>: One instance via Module Federation config</li>
          <li><strong>Shared Services MF</strong>: HTTP Interceptor & Event Bus as separate MF</li>
          <li><strong>Direct Imports</strong>: Services imported directly via Module Federation</li>
          <li><strong>HTTP Interceptor</strong>: Error handling (401, 404, 500) with retry logic</li>
          <li><strong>Event Bus</strong>: CustomEvents for cross-app communication</li>
          <li><strong>BFF Pattern</strong>: Each microfrontend → its own API</li>
        </ul>
      </div>
    </div>
  );
}

