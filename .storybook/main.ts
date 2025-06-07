import { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-essentials'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    viteFinal: (config) => {
        config.resolve = {
            alias: {
                '@': resolve(fileURLToPath(new URL('../src', import.meta.url))),
            },
        };
        return config;
    },
};

export default config;
