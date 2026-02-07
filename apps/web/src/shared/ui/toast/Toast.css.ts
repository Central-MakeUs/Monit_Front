import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars, spacing, typography } from '../theme.css';

// Animations
const slideDown = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const fadeOut = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

// Toast Container (fixed wrapper)
export const toastContainer = style({
  position: 'fixed',
  top: '2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  zIndex: 99999,
  pointerEvents: 'none',
});

export const toastItem = style({
  animation: `${slideDown} 0.3s ease-out`,
});

export const toastItemExiting = style({
  animation: `${fadeOut} 0.3s ease-out forwards`,
});

// Individual Toast
export const toast = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: spacing.sm2,
  padding: `${spacing.sm} ${spacing.md}`,
  backgroundColor: vars.color.bg.surface.primary.subtle,
  borderRadius: vars.radius.sm,
  boxShadow: vars.shadow.shadow3,
  width: 'fit-content',
});

export const toastIcon = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.4rem',
    height: '2.4rem',
    flexShrink: 0,
    overflow: 'hidden',
  },
  variants: {
    variant: {
      success: {
        color: vars.color.bg.accent.green.default,
      },
      attention: {
        color: vars.color.bg.accent.yellow.default,
      },
    },
  },
});

export const toastIconSvg = style({
  width: '2.4rem',
  height: '2.4rem',
  display: 'block',
});

export const toastText = style({
  ...typography.head.h2,
  color: vars.color.text.onBrand,
  whiteSpace: 'nowrap',
});
