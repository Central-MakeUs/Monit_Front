import { style } from '@vanilla-extract/css';
import { spacing, radius, vars } from '../theme.css';
import { recipe } from '@vanilla-extract/recipes';

export const badgeContainer = recipe({
  base: {
    display: 'inline-flex',
    gap: spacing.xs,
    alignItems: 'center',
    borderRadius: radius.xs,
  },
  variants: {
    size: {
      xs: {
        padding: `${spacing.xs} ${spacing.sm}`,
        backgroundColor: vars.color.bg.neutral.subtle,
      },
      sm: {
        padding: `${spacing.xs} ${spacing.sm}`,
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
      xs: { width: '11.6px', height: '11.6px' },
      sm: {
        width: '13.3px',
        height: '13.3px',
      },
    },
  },
});

export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.13rem',
  width: '1.33rem',
  height: '1.33rem',
});
