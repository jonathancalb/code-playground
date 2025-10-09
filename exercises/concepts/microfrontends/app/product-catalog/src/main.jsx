import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductCatalog from './ProductCatalog';

// Mock event bus for standalone mode
if (!window.eventBus) {
  window.eventBus = {
    emit: (event, data) => console.log(`[Standalone] Event: ${event}`, data)
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <h1>Product Catalog - Standalone Mode</h1>
      <ProductCatalog />
    </div>
  </React.StrictMode>
);

