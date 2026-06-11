import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      sourcemap: !isProd,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor'
              }
              if (id.includes('framer-motion')) {
                return 'motion-vendor'
              }
              if (id.includes('leaflet') || id.includes('react-leaflet')) {
                return 'map-vendor'
              }
              if (id.includes('lucide-react')) {
                return 'icons-vendor'
              }
              if (id.includes('axios')) {
                return 'http-vendor'
              }
              return 'vendor'
            }
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'axios', 'framer-motion'],
    },
  }
})
