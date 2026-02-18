import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars, radius, spacing, shadows } from '../theme.css';

export const container = style({
  position: 'fixed',
  inset: 0,
  zIndex: vars.zIndex.overlay,
});

export const backdrop = recipe({
  base: {
    position: 'absolute',
    inset: 0,
    backgroundColor: vars.color.bg.overlay,
    transition: 'opacity 300ms ease-out',
  },
  variants: {
    transparent: {
      true: {
        backgroundColor: 'transparent',
      },
      false: {},
    },
    visible: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
  defaultVariants: {
    transparent: false,
    visible: false,
  },
});

export const sheet = recipe({
  base: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    maxWidth: '768px',
    margin: '0 auto',
    backgroundColor: vars.color.bg.surface.secondary.default,
    borderTopLeftRadius: radius.lg2,
    borderTopRightRadius: radius.lg2,
    padding: `${spacing.lg} ${spacing.xl}`,
    paddingTop: spacing['2xl'],
    boxShadow: shadows.shadow2,
    zIndex: vars.zIndex.modal,
    transition: 'transform 300ms ease-out',
  },
  variants: {
    animating: {
      true: {
        transform: 'translateY(0)',
      },
      false: {
        transform: 'translateY(100%)',
      },
    },
  },
  defaultVariants: {
    animating: false,
  },
});
