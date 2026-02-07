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
  overflow: 'hidden',
});

export const slide = style({
  minWidth: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '32px',
  paddingTop: '80px',
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  textAlign: 'center',
  paddingInline: '20px',
});

export const onboardingImage = style({
  objectFit: 'contain',
});

export const indicatorWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  paddingBlock: '24px',
});
