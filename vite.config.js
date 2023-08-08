import { resolve } from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    build: {
        rollupOptions: {
            input: resolve(__dirname, 'index.html'),
        },
    },
};
