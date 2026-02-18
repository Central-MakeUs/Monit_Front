import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '0 1.8rem',
  marginTop: '2.8rem',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const emotionDescriptionArea = style({
  marginTop: 'auto',
  marginBottom: 'calc(4.8rem + 5.4rem)',
});
