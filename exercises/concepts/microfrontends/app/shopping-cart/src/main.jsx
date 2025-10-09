import React from 'react';
import ReactDOM from 'react-dom/client';
import ShoppingCart from './ShoppingCart';

// Mock event bus for standalone mode
if (!window.eventBus) {
  window.eventBus = {
    on: (event, cb) => console.log(`[Standalone] Listener: ${event}`)
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <h1>Shopping Cart - Standalone Mode</h1>
      <ShoppingCart />
    </div>
  </React.StrictMode>
);

