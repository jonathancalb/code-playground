import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shoppingCart',
      filename: 'remoteEntry.js',
      exposes: {
        './ShoppingCart': './src/ShoppingCart.jsx',
      },
      shared: ['react', 'react-dom']  // Tree shake React duplication
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5002,
  }
})

