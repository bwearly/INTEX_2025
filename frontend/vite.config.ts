import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.googleapis.com;
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: blob: https://cinanicheposters.blob.core.windows.net;
        frame-src https://www.youtube.com;
        font-src 'self' fonts.gstatic.com data:;
        connect-src 'self' https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net https://www.googleapis.com;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
      `
        .replace(/\s{2,}/g, ' ')
        .trim(),
    },
  },
});
