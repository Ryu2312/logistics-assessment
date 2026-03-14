import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        include: ['test/**/*.spec.ts', 'test/**/*.spec.tsx', 'src/**/*.spec.ts', 'src/**/*.spec.tsx'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'src/main.tsx',
                '**/*.d.ts',
                'test/**/*.spec.ts',
                'test/**/*.spec.tsx',
            ],
        },
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
        },
    },
});
