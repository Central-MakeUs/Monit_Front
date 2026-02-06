import { recipe } from '@vanilla-extract/recipes';
import { vars, spacing, radius } from '../theme.css';

export const container = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${spacing.xs2} ${spacing.xs2}`,
  },
  variants: {
    size: {
      sm: { gap: spacing.xs2 },
      md: { gap: spacing.sm2 },
    },
  },
});

export const dot = recipe({
  base: {
    borderRadius: radius.full,
  },
  variants: {
    state: {
      active: {
        backgroundColor: vars.color.indicator.active,
      },
      default: {
        backgroundColor: vars.color.indicator.default,
      },
    },
    size: {
      sm: { width: '0.6rem', height: '0.6rem' },
      md: { width: '0.7rem', height: '0.7rem' },
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
