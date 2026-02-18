export const fontFamily = {
  suit: 'var(--font-suit), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
} as const;

export const fontWeight = {
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSize = {
  b1: '1.1rem',
  b2: '1.2rem',
  b3: '1.4rem',
  b4: '1.6rem',
  b5: '1.8rem',
  h1: '1.2rem',
  h2: '1.4rem',
  h3: '1.6rem',
  h4: '1.8rem',
  h5: '2.0rem',
  t1: '2.0rem',
  t2: '2.2rem',
  t3: '2.6rem',
  t4: '2.6rem',
  t5: '3.2rem',
} as const;

export const lineHeight = {
  b1: 'normal',
  b2: '1.92rem',
  b3: '1.96rem',
  b4: '2.24rem',
  b5: 'normal',
  h1: 'normal',
  h2: 'normal',
  h3: 'normal',
  h4: 'normal',
  h5: 'normal',
  t1: 'normal',
  t2: '2.86rem',
  t3: '3.77rem',
  t4: '3.64rem',
  t5: 'normal',
} as const;

export const letterSpacing = {
  none: '0',
  tight: '-0.01rem',
} as const;

export const typography = {
  title: {
    t5: {
      fontSize: '3.2rem',
      fontWeight: 700,
      lineHeight: 'normal',
      letterSpacing: '0',
    },
    t4: {
      fontSize: '2.6rem',
      fontWeight: 700,
      lineHeight: '140%',
      letterSpacing: '0',
    },
    t3: {
      fontSize: '2.6rem',
      fontWeight: 700,
      lineHeight: '145%',
      letterSpacing: '0',
    },
    t2: {
      fontSize: '2.2rem',
      fontWeight: 700,
      lineHeight: '130%',
      letterSpacing: '0',
    },
    t1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 'normal',
      letterSpacing: '0',
    },
  },
  head: {
    h5: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 'normal',
      letterSpacing: '-0.01rem',
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: 600,
      lineHeight: 'normal',
      letterSpacing: '-0.01rem',
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: 600,
      lineHeight: 'normal',
      letterSpacing: '-0.01rem',
    },
    h2: {
      fontSize: '1.4rem',
      fontWeight: 600,
      lineHeight: 'normal',
      letterSpacing: '-0.01rem',
    },
    h1: {
      fontSize: '1.2rem',
      fontWeight: 600,
      lineHeight: 'normal',
      letterSpacing: '-0.01rem',
    },
  },
  body: {
    b5: {
      fontSize: '1.8rem',
      fontWeight: 500,
      lineHeight: 'normal',
      letterSpacing: '-0.01rem',
    },
    b4: {
      fontSize: '1.6rem',
      fontWeight: 500,
      lineHeight: '140%',
      letterSpacing: '-0.01rem',
    },
    b3: {
      fontSize: '1.4rem',
      fontWeight: 500,
      lineHeight: '140%',
      letterSpacing: '-0.01rem',
    },
    b2: {
      fontSize: '1.2rem',
      fontWeight: 500,
      lineHeight: '160%',
      letterSpacing: '-0.01rem',
    },
    b1: {
      fontSize: '1.1rem',
      fontWeight: 500,
      lineHeight: 'normal',
      letterSpacing: '-0.01rem',
    },
    description: {
      fontSize: '0.9rem',
      fontWeight: 500,
      lineHeight: 'normal',
      letterSpacing: '-0.01rem',
    },
  },
} as const;

export type Typography = typeof typography;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
