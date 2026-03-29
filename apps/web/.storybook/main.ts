import type { StorybookConfig } from '@storybook/nextjs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'node:url';
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import type { RuleSetRule } from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-designs'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  staticDirs: ['../public'],

  webpackFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(new VanillaExtractPlugin());

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@/shared': path.resolve(__dirname, '../src/shared'),
      '@/entities': path.resolve(__dirname, '../src/entities'),
      '@/features': path.resolve(__dirname, '../src/features'),
      '@/widgets': path.resolve(__dirname, '../src/widgets'),
    };

    const imageRule = config.module?.rules?.find((rule) => {
      const test = (rule as RuleSetRule)?.test;
      if (!test) {
        return false;
      }
      return test instanceof RegExp && test.test('.svg');
    }) as RuleSetRule;

    if (imageRule) {
      imageRule.exclude = /\.svg$/;
    }

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
