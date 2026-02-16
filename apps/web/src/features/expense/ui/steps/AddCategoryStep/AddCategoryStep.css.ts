import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '2.9rem 1.8rem 0 1.8rem',
  alignItems: 'start',
  gap: '3rem',
});

export const inputFieldStyle = style({
  gap: '1rem',
});
