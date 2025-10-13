import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'productCatalog',
      filename: 'remoteEntry.js',
      remotes: {
        sharedServices: 'http://localhost:5003/assets/remoteEntry.js',
      },
      exposes: {
        './ProductCatalog': './src/ProductCatalog.jsx',
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
    port: 5001,
  }
})

