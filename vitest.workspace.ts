import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineWorkspace } from 'vitest/config';
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';

const dirname =
    typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineWorkspace([
    // 1 configuracion
    'vite.config.ts',
    // 2. Tests Storybook
    {
        extends: 'vite.config.ts',
        plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
            storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
            name: 'storybook',
            browser: {
                enabled: true,
                headless: true,
                name: 'chromium',
                provider: 'playwright',
            },
            setupFiles: ['.storybook/vitest.setup.ts'],
        },
    },
    // 3. Componentes UI
    {
        extends: 'vite.config.ts',
        test: {
            name: 'components',
            include: ['src/presentation/components/**/*.test.ts?(x)'],
            environment: 'jsdom',
            setupFiles: 'src/test/setup.ts',
        },
    },
    // 4. ViewModels
    {
        extends: 'vite.config.ts',
        test: {
            name: 'viewmodels',
            include: ['src/presentation/viewmodels/**/*.test.ts?(x)'],
            environment: 'jsdom',
            setupFiles: 'src/test/setup.ts',
        },
    },

    // 5. Utils
    {
        extends: 'vite.config.ts',
        test: {
            name: 'utils',
            include: ['src/utils/**/*.test.ts?(x)'],
            environment: 'node',
        },
    },

    // 6. Store (context + zustand)
    {
        extends: 'vite.config.ts',
        test: {
            name: 'store',
            include: ['src/store/**/*.test.ts?(x)'],
            environment: 'jsdom',
            setupFiles: 'src/test/setup.ts',
        },
    },

    // 7. Servicios
    {
        extends: 'vite.config.ts',
        test: {
            name: 'services',
            include: ['src/services/**/*.test.ts?(x)'],
            environment: 'node',
        },
    },
]);
