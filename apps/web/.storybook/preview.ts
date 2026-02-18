import type { Preview } from '@storybook/react';
import './fonts.css.ts';
import '../src/shared/styles/global.css.ts';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
