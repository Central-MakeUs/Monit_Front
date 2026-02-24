import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme.css';

export const indicatorXVar = createVar();
export const indicatorWVar = createVar();

export const container = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: vars.spacing.xs2,
  backgroundColor: vars.color.text.primary,
  borderRadius: vars.radius.full,
  border: `0.6px solid ${vars.color.bg.neutral}`,
  boxShadow: vars.shadow.shadow1,
  position: 'relative',
});

export const itemsRow = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

export const indicator = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  width: indicatorWVar,
  backgroundColor: vars.color.bg.surface.secondary.default,
  borderRadius: vars.radius.full,
  boxShadow: vars.shadow.shadow1,
  transform: `translateX(${indicatorXVar})`,
  transition:
    'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
});
export const rowRightActive = style({ paddingLeft: '1rem' });
export const rowLeftActive = style({ paddingRight: '1rem' });

export const item = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.spacing.xs2,
    borderRadius: vars.radius.full,
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    position: 'relative',
    transition: 'color 0.2s ease, padding 0.25s cubic-bezier(0.4, 0, 0.2, 1)',

    selectors: {
      '&:disabled': {
        opacity: 0.5,
      },
    },
  },
  variants: {
    active: {
      true: {
        width: '11.2rem',
        padding: '1.2rem 0',
      },
      false: {
        width: '5.2rem',
        padding: '1.2rem 1.4rem',
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const icon = recipe({
  base: {
    width: '2.4rem',
    height: '2.4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s ease',
  },
  variants: {
    active: {
      true: {
        color: vars.color.icon.secondary,
      },
      false: {
        color: vars.color.icon.tertiary,
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const label = recipe({
  variants: {
    active: {
      true: {
        color: vars.color.icon.secondary,
      },
      false: {
        color: vars.color.icon.tertiary,
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});
