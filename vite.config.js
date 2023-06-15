import { resolve } from 'node:path';

export default {
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    },
  }
}
