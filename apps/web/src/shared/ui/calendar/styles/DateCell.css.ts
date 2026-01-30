import { recipe } from '@vanilla-extract/recipes';
import { vars, typography, shadows } from '@/shared/ui/theme.css';

export const dateCellWrapper = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  variants: {
    size: {
      md: {
        width: '4.8rem',
        height: '4.8rem',
      },
      lg: {
        width: '4.8rem',
        height: '5.2rem',
      },
      weekly: {
        width: '4.4rem',
        padding: 0,
      },
    },
    showText: {
      true: {
        flexDirection: 'column',
        gap: '0.3rem',
        height: 'auto',
        minHeight: '5.2rem',
      },
      false: {},
    },
  },
  defaultVariants: {
    size: 'md',
    showText: false,
  },
});

export const dateBadge = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vars.radius.sm,
    transition: 'background-color 0.15s ease-out',
    color: vars.color.text.secondary,
  },
  variants: {
    size: {
      md: {
        width: '3.2rem',
        height: '3.2rem',
        ...typography.body.b4,
      },
      lg: {
        width: '3.2rem',
        height: '3.2rem',
        ...typography.body.b5,
      },
      weekly: {
        width: '100%',
        height: '4.4rem',
        padding: '1.2rem',
        borderRadius: vars.radius.xl,
        ...typography.body.b4,
      },
    },
    selected: {
      true: {},
      false: {},
    },
    today: {
      true: {
        border: `1px solid ${vars.color.border.default}`,
      },
    },
    isOutsideMonth: {
      true: {
        color: vars.color.text.tertiary,
      },
    },
  },
  compoundVariants: [
    {
      variants: { size: 'md', selected: true },
      style: {
        backgroundColor: vars.color.bg.brand.default,
        color: vars.color.text.onBrand,
        ':hover': {
          backgroundColor: vars.color.bg.brand.hover,
        },
      },
    },
    {
      variants: { size: 'lg', selected: true },
      style: {
        backgroundColor: 'white',
        color: vars.color.text.primary,
        boxShadow: shadows.shadow2,
      },
    },
    {
      variants: { size: 'weekly', selected: true },
      style: {
        backgroundColor: vars.color.bg.surface.secondary.default,
        color: vars.color.text.primary,
        boxShadow: shadows.shadow2,
      },
    },
  ],
  defaultVariants: {
    selected: false,
    today: false,
    size: 'md',
  },
});

export const dateText = recipe({
  base: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '-0.01em',
  },
  variants: {
    size: {
      md: {},
      lg: {
        ...typography.body.description,
        color: vars.color.text.secondary,
      },
      weekly: {
        display: 'none',
      },
    },
    isOutsideMonth: {
      true: {
        color: vars.color.text.tertiary,
      },
      false: {},
    },
    selected: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { size: 'lg', isOutsideMonth: true },
      style: {
        color: 'transparent',
      },
    },
    {
      variants: { size: 'lg', selected: true },
      style: {
        color: vars.color.text.primary,
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    isOutsideMonth: false,
    selected: false,
  },
});
