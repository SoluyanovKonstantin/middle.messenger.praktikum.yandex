import { resolve } from 'node:path';

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        auth: resolve(__dirname, 'src/components/auth/auth.html'),
        registration: resolve(__dirname, 'src/components/registration/registration.html'),
      },
    },
  }
}