import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme.css';

export const indicatorXVar = createVar();
export const indicatorWVar = createVar();

export const container = style({
  display: 'inline-flex',
  gap: vars.spacing.xs2,
  alignItems: 'center',
  padding: vars.spacing.xs,
  backgroundColor: vars.color.bg.neutral.primary,
  borderRadius: vars.radius.sm2,
  width: 'fit-content',
  position: 'relative',
});

export const itemsRow = style({
  display: 'flex',
  gap: vars.spacing.xs2,
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
});

export const indicator = style({
  position: 'absolute',
  top: vars.spacing.xs,
  bottom: vars.spacing.xs,
  left: vars.spacing.xs,
  width: indicatorWVar,
  backgroundColor: vars.color.bg.surface.secondary.default,
  borderRadius: vars.radius.xs2,
  boxShadow: `0 1px 2px 0 ${vars.color.primitive.static.shadow.shadow2}, 0 0 2px 0 ${vars.color.primitive.static.shadow.shadow2}`,
  transform: `translateX(${indicatorXVar})`,
  transition:
    'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  pointerEvents: 'none',

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.xs,
  padding: `0.5rem ${vars.spacing.xs2}`,
  borderRadius: vars.radius.xs2,
  border: 'none',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  outline: 'none',
  position: 'relative',

  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      color: vars.color.icon.disabled,
    },
  },
});

export const icon = recipe({
  base: {
    width: '1.6rem',
    height: '1.6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'filter 0.2s ease',
  },
  variants: {
    active: {
      true: {
        filter: 'none',
        color: vars.color.icon.secondary,
      },
      false: {
        color: vars.color.icon.disabled,
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});
