import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true, // 🔑 هاد السطر - إلا كان port مشغول كيوقف بدل ما يبدل
  }
})