import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  paddingTop: '4rem',
  backgroundColor: vars.color.bg.base,
  justifyContent: 'space-between',
});

const slideUp = keyframes({
  from: { transform: 'translateY(100%)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
});

const slideDown = keyframes({
  from: { transform: 'translateY(0)', opacity: 1 },
  to: { transform: 'translateY(100%)', opacity: 0 },
});

const buttonWrapperBase = {
  position: 'relative' as const,
  zIndex: 1,
  marginBottom: '3.3rem',
  paddingRight: '1.8rem',
  paddingLeft: '1.8rem',
};

export const buttonWrapper = style({
  ...buttonWrapperBase,
  animation: `${slideUp} 0.4s ease-out`,
});

export const buttonWrapperExit = style({
  ...buttonWrapperBase,
  animation: `${slideDown} 0.4s ease-out forwards`,
});
