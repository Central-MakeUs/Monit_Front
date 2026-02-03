import { recipe } from '@vanilla-extract/recipes';
import { vars, spacing, radius } from '../theme.css';

export const ratingButtonWrapper = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    padding: `${spacing.sm} ${spacing.xs}`,
    alignItems: 'center',
    gap: spacing.sm,
    border: 'none',
    background: 'transparent',
    outline: 'none',
    transition: 'transform 0.1s ease-out',
    ':active': {
      transform: 'scale(0.96)',
    },
  },
  variants: {
    readOnly: {
      true: {
        ':active': {
          transform: 'none',
        },
      },
    },
  },
});

export const ratingIconContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 0 2px 0 rgba(0, 0, 0, 0.08) inset`,
    border: '0.1rem solid transparent',
    transition:
      'background-color 0.15s ease-out, border-color 0.15s ease-out, opacity 0.15s ease-out',
  },
  variants: {
    selected: {
      true: {},
      false: {
        backgroundColor: vars.color.bg.base,
      },
    },
    size: {
      md: { padding: '0.6rem', borderRadius: radius.xxxl },
      lg: { padding: '0.9rem', borderRadius: '20px' },
    },
  },
  defaultVariants: {
    selected: false,
    size: 'md',
  },
});

export const ratingIconSvg = recipe({
  base: {
    display: 'block',
    width: '3.2rem',
    height: '3.2rem',
    alignItems: 'center',
  },
});
