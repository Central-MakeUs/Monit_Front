import { style } from '@vanilla-extract/css';

export const selectorContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '40rem',
  marginLeft: 'auto',
});

export const pickerWrapper = style({
  width: '50%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});
