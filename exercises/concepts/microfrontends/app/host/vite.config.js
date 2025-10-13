import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        productCatalog: 'http://localhost:5001/assets/remoteEntry.js',
        shoppingCart: 'http://localhost:5002/assets/remoteEntry.js',
        sharedServices: 'http://localhost:5003/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom']  // Share React - avoid duplication
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5000,
  }
})

