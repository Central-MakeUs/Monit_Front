import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '3.7rem 1.8rem 3rem 1.8rem',
  justifyContent: 'space-between',
  minHeight: 'calc(100dvh - 3.5rem)',
});

export const formGroup = style({
  display: 'flex',
  flexDirection: 'column',
});

export const textAreaWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  marginTop: '2.5rem',
});
