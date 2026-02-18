import { spacing, radius, vars } from '../theme.css';
import { recipe } from '@vanilla-extract/recipes';

export const badgeContainer = recipe({
  base: {
    display: 'inline-flex',
    gap: spacing.xs,
    padding: `${spacing.xs} ${spacing.sm}`,
    alignItems: 'center',
    borderRadius: radius.xs,
  },
  variants: {
    size: {
      sm: {
        backgroundColor: vars.color.bg.neutral.subtle,
      },
      lg: {
        border: `0.8px solid ${vars.color.border.default}`,
        backgroundColor: vars.color.bg.neutral.subtle,
      },
    },
    hasState: {
      true: {},
      false: {},
    },
  },
});

export const icon = recipe({
  base: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  variants: {
    size: {
      sm: { width: '1.05rem', height: '1.05rem' },
      lg: {
        width: '1.4rem',
        height: '1.4rem',
      },
    },
  },
});
