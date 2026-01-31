import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars, spacing, typography } from '../theme.css';

export const categoryButtonWrapper = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm2,
    padding: spacing.sm,
    cursor: 'pointer',
    position: 'relative',
    border: 'none',
    background: 'transparent',
    outline: 'none',
    transition: 'transform 0.1s ease-out',
    ':active': {
      transform: 'scale(0.96)',
    },
  },
});

export const categoryIconContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'inset 0rem 0rem 0.125rem 0rem rgba(0, 0, 0, 0.08)',
    transition: 'background-color 0.15s ease-out, border-color 0.15s ease-out',
    position: 'relative',
  },
  variants: {
    size: {
      sm: {
        width: '3.6rem',
        height: '3.6rem',
        borderRadius: '1.2rem',
      },
      md: {
        width: '5.2rem',
        height: '5.2rem',
        borderRadius: '1.6rem',
      },
      lg: {
        width: '6.2rem',
        height: '6.2rem',
        borderRadius: '1.8rem',
      },
    },
    type: {
      primary: {
        backgroundColor: vars.color.bg.base,
      },
      secondary: {
        backgroundColor: vars.color.bg.neutral.subtle,
      },
    },
    mode: {
      default: {
        border: 'none',
      },
      active: {
        border: `${vars.lineWidth.sm} solid ${vars.color.bg.brand.default}`,
      },
      plus: {
        border: 'none',
      },
      edit: {
        border: 'none',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    type: 'primary',
    mode: 'default',
  },
});

export const categoryIconSvg = recipe({
  base: {
    display: 'block',
    flexShrink: 0,
  },
  variants: {
    size: {
      sm: {
        width: '2.4rem',
        height: '2.4rem',
      },
      md: {
        width: '3.2rem',
        height: '3.2rem',
      },
      lg: {
        width: '4.2rem',
        height: '4.2rem',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const categoryLabel = recipe({
  base: {
    ...typography.body.b2,
    textAlign: 'center',
    width: '100%',
    transition: 'color 0.15s ease-out',
  },
  variants: {
    mode: {
      default: {
        color: vars.color.text.secondary,
      },
      active: {
        color: vars.color.text.primary,
      },
      plus: {
        color: vars.color.text.secondary,
      },
      edit: {
        color: vars.color.text.secondary,
      },
    },
  },
  defaultVariants: {
    mode: 'default',
  },
});

export const editButton = recipe({
  base: {
    position: 'absolute',
    width: '2rem',
    height: '2rem',
    borderRadius: vars.radius.full,
    backgroundColor: vars.color.bg.brand.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.1s ease-out',
    ':hover': {
      transform: 'scale(1.1)',
    },
    ':active': {
      transform: 'scale(0.95)',
    },
  },
  variants: {
    size: {
      sm: {
        bottom: '2.49rem',
        left: '2.77rem',
      },
      md: {
        bottom: '3.6rem',
        left: '4rem',
      },
      lg: {
        bottom: '4.29rem',
        left: '4.77rem',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const editIcon = style({
  width: '1rem',
  height: '1rem',
  color: vars.color.icon.onBrand,
});
