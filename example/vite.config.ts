import { join } from 'path';
import { SharedConfig } from 'vite';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';

const envFiles = [
    /** default file */ `.env`,
    /** mode file */ `.env.${process.env.NODE_ENV}`,
];

envFiles.map(file => {
    const envConfig = parse(readFileSync(file));
    for (const k in envConfig) { process.env[k] = envConfig[k]; }
});

export default {
    alias: {
        '/@/': join(__dirname, 'src'),
        '/~/': join(__dirname, 'src/assets'),
    },
    minify: 'esbuild',
    base: process.env.VITE_BASE_URL,
    outDir: process.env.VITE_OUTPUT_DIR,
    define: {
        VITE_HTTP_BASE_URL: process.env.VITE_HTTP_BASE_URL,
    }
} as SharedConfig;
