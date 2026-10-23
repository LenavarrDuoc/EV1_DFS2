import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permite usar describe, it y expect sin importarlos individualmente
    environment: 'jsdom', // Entorno de navegador virtual
    setupFiles: './src/setupTests.js', // Carga matcher de jest-dom
  },
});
