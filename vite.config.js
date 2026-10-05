import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    build: {
        rollupOptions: {
            output: {
                // Split vendor libs into separate cacheable chunks
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'icons': ['lucide-react'],
                },
            },
        },
        chunkSizeWarningLimit: 800,
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
        },
    },
});
