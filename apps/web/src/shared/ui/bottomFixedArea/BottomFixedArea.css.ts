import { style, createVar } from '@vanilla-extract/css';

export const zIndexVar = createVar();

export const container = style({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '43rem',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  pointerEvents: 'none',
  zIndex: zIndexVar,
  transition: 'transform 200ms cubic-bezier(0.1, 0.76, 0.55, 0.9)',
  vars: {
    [zIndexVar]: '100',
  },
});

export const inner = style({
  pointerEvents: 'auto',
});
