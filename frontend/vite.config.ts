// vite.config.ts
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': 'http://localhost:5000', // Proxy API requests to backend
//     },
//   },
// });

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env vars for the current mode (e.g., 'development')
  const env = loadEnv(mode, process.cwd(), '');
console.log('Backend URL:', import.meta.env.VITE_API_BASE_URL);

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: import.meta.env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
