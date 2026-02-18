export const primitiveNumbers = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  11: 11,
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  22: 22,
  26: 26,
  32: 32,
} as const;

export const spacing = {
  xs: '0.4rem',
  xs2: '0.6rem',
  sm: '0.8rem',
  sm2: '1rem',
  md: '1.2rem',
  lg: '1.4rem',
  lg2: '1.6rem',
  xl: '1.8rem',
  '2xl': '2rem',
} as const;

export const radius = {
  xs: '2px',
  xs2: '3px',
  sm: '4px',
  sm2: '5px',
  md: '8px',
  lg: '10px',
  lg2: '12px',
  xl: '14px',
  xxl: '16px',
  xxxl: '18px',
  full: '999px',
} as const;

export const lineWidth = {
  sm: '1px',
  md: '2px',
  lg: '4px',
} as const;

export type Spacing = typeof spacing;
export type Radius = typeof radius;
export type LineWidth = typeof lineWidth;
