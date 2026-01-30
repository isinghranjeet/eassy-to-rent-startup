import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3000,
      host: true,
    },
    // ✅ Vercel deployment के लिए important
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          }
        }
      }
    },
    // ✅ Environment variables define करें
    define: {
      '.env': env,
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'https://eassy-to-rent-backend.onrender.com')
    }
  }
})