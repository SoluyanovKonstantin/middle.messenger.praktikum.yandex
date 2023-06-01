import { resolve } from 'node:path';

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'src/components/auth/auth.html'),
      }
    }
  }
}