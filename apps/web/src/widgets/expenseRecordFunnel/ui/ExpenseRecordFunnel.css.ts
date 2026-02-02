import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'auto',
});

export const header = style({
  position: 'sticky',
  top: 0,
});
