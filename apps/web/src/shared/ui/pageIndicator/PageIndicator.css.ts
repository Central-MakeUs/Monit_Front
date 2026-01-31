import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars, spacing, radius } from '../theme.css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm2,
  padding: `${spacing.xs2} ${spacing.xs2}`,
});

export const dot = recipe({
  base: {
    width: '0.7rem',
    height: '0.7rem',
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
  },
  defaultVariants: {
    state: 'default',
  },
});
