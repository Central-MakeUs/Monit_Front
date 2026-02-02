import { style } from '@vanilla-extract/css';

export const selectorContainer = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '40rem',
  position: 'relative',
});

export const pickerWrapper = style({
  position: 'absolute',
  right: '0',
  width: '50%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
});
