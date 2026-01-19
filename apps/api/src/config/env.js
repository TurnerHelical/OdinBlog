import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, '..', '..', '.env');

dotenv.config({ path: configPath });

const config = {
    port: process.env.PORT,
    node_ENV: process.env.NODE_ENV
};

export { config };