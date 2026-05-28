import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy vendor libs into separate cacheable chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-charts': ['recharts'],
          'vendor-ui': ['sweetalert2'],
          'vendor-qr': ['html5-qrcode', 'react-qr-code'],
        },
      },
    },
    // Increase chunk size warning threshold
    chunkSizeWarningLimit: 600,
  },
});
