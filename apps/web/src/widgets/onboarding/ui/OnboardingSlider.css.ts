import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflow: 'hidden',
});

export const slideContainer = style({
  display: 'flex',
  flex: 1,
  width: '100%',
  transition: 'transform 0.3s ease-out',
});

export const slide = style({
  minWidth: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.8rem',
});

export const largeGapSlide = style({
  minWidth: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3.57rem',
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.4rem',
  textAlign: 'center',
});

export const indicatorWrapper = style({
  display: 'flex',
  justifyContent: 'center',
});
