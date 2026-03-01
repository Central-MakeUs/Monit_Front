import { style } from '@vanilla-extract/css';

export const list = style({
  display: 'flex',
  flexDirection: 'column',
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.2rem',
  flex: 1,
  height: '100%',
  paddingBottom: '30%',
});

export const iconWrapper = style({
  margin: '0.2rem',
});
