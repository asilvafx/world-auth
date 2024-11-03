import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  build: {
    chunkSizeWarningLimit: 1600,
    outDir: '../dist',
    emptyOutDir: true, 
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks: () => 'index.js',
      },
    },
  },
  plugins: [react(),tailwindcss()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
