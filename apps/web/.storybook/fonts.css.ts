import { fontFace, globalStyle } from '@vanilla-extract/css';

/**
 * Storybook용 폰트 정의
 *
 * Note: Next.js는 next/font/local로 폰트를 로드하지만,
 * Storybook은 별도 빌드 환경이므로 여기서 다시 정의해야 합니다.
 */
export const suitFont = fontFace({
  src: "url('/fonts/SUIT-Variable.woff2') format('woff2-variations')",
  fontStyle: 'normal',
  fontWeight: '100 900',
  fontDisplay: 'swap',
});

globalStyle(':root', {
  vars: {
    '--font-suit': suitFont,
  },
});
