import { style, keyframes } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
});

export const sliderWrapper = style({
  flex: 1,
  overflow: 'hidden',
});

const slideUpAnimation = keyframes({
  from: {
    transform: 'translateY(100%)',
    opacity: 0,
  },
  to: {
    transform: 'translateY(0)',
    opacity: 1,
  },
});

export const buttonWrapper = style({
  paddingBottom: '40px',
  animation: `${slideUpAnimation} 0.3s ease-out`,
});
