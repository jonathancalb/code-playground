import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    federation({
      name: 'sharedServices',
      filename: 'remoteEntry.js',
      exposes: {
        './httpInterceptor': './src/httpInterceptor.js',
        './eventBus': './src/eventBus.js',
      },
      shared: []
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        // No HTML entry needed - just expose services
        remoteEntry: './src/remoteEntry.js'
      }
    }
  },
  server: {
    port: 5003,
  }
})
