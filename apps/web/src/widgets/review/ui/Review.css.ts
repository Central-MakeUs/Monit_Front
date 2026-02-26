import { spacing } from '@/shared/ui/theme.css';
import { keyframes, style } from '@vanilla-extract/css';

const fadeSlideUp = keyframes({
  from: { opacity: 0, transform: 'translateY(1.2rem)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const fadeSlideDown = keyframes({
  from: { opacity: 1, transform: 'translateY(0)' },
  to: { opacity: 0, transform: 'translateY(1.2rem)' },
});

export const submitButtonEnter = style({
  animation: `${fadeSlideUp} 0.2s ease-in-out`,
});

export const submitButtonExit = style({
  animation: `${fadeSlideDown} 0.2s ease-in-out forwards`,
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  marginRight: '1.8rem',
  marginLeft: '1.8rem',
  marginTop: '2rem',
});

export const titleText = style({
  marginLeft: '0.2rem',
});

export const pageIndicatorWrapper = style({
  marginTop: '1.4rem',
  display: 'flex',
  justifyContent: 'center',
});

export const carouselWrapper = style({
  width: '100%',
  overflow: 'hidden',
});

export const carouselContainer = style({
  width: '100%',
  overflow: 'visible',
  position: 'relative',
  padding: `0 ${spacing.lg}`,
});

export const carouselTrack = style({
  display: 'flex',
  gap: 0,
  willChange: 'transform',
  backfaceVisibility: 'hidden',
});

export const carouselSlide = style({
  width: '100%',
  minWidth: '100%',
  flexShrink: 0,
  padding: `0 ${spacing.xs2}`,
  marginTop: '1.25rem',
  boxSizing: 'border-box',
});
