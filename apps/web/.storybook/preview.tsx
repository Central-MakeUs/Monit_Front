import type { Preview } from '@storybook/nextjs';
import './fonts.css.ts';
import '../src/shared/styles/global.css.ts';
import './storybook-override.css';

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
