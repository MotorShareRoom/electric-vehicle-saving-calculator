import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/electric-vehicle-saving-calculator/',
  plugins: [react()],
});