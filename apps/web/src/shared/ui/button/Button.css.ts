import { recipe } from '@vanilla-extract/recipes';
import { vars, spacing, typography } from '../theme.css';

const buttonSizes = {
  sm: {
    paddingY: spacing.xs2,
    paddingX: spacing.sm2,
    gap: spacing.xs,
  },
  md: {
    height: '4.8rem',
    paddingY: spacing.md,
    paddingX: spacing['2xl'],
  },
  lg: {
    height: '5.4rem',
    paddingY: spacing.md,
    paddingX: spacing['2xl'],
  },
} as const;

export const button = recipe({
  base: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm2,
    borderRadius: vars.radius.sm2,
    border: 'none',
    cursor: 'pointer',
    transition:
      'background-color 0.15s ease-out, border-color 0.15s ease-out, transform 0.1s ease-out',
    outline: 'none',
    ':focus-visible': {
      boxShadow: `0 0 0 2px ${vars.color.primitive.static.white}, 0 0 0 4px ${vars.color.bg.brand.default}`,
    },
    ':active': {
      transform: 'scale(0.98)',
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.bg.surface.primary.default,
        color: vars.color.text.onBrand,
        ':hover': {
          backgroundColor: vars.color.bg.surface.primary.hover,
          color: vars.color.text.tertiary,
        },
        ':active': {
          backgroundColor: vars.color.bg.surface.primary.active,
          color: vars.color.text.tertiary,
        },
      },
      secondary: {
        backgroundColor: vars.color.bg.neutral.default,
        color: vars.color.text.secondary,
        ':hover': {
          backgroundColor: vars.color.bg.neutral.hover,
        },
        ':active': {
          backgroundColor: vars.color.bg.neutral.active,
        },
      },
      brand: {
        backgroundColor: vars.color.bg.brand.default,
        color: vars.color.text.onBrand,
        ':hover': {
          backgroundColor: vars.color.bg.brand.hover,
        },
        ':active': {
          backgroundColor: vars.color.bg.brand.active,
        },
      },
      white: {
        backgroundColor: vars.color.bg.surface.secondary.default,
        color: vars.color.text.primary,
        border: `1px solid ${vars.color.border.default}`,
        ':hover': {
          backgroundColor: vars.color.bg.surface.secondary.hover,
          color: vars.color.text.secondary,
        },
        ':active': {
          backgroundColor: vars.color.bg.surface.secondary.active,
          color: vars.color.text.secondary,
        },
      },
    },
    size: {
      sm: {
        padding: `${buttonSizes.sm.paddingY} ${buttonSizes.sm.paddingX}`,
        ...typography.body.b1,
      },
      md: {
        height: buttonSizes.md.height,
        padding: `${buttonSizes.md.paddingY} ${buttonSizes.md.paddingX}`,
        ...typography.head.h2,
      },
      lg: {
        height: buttonSizes.lg.height,
        padding: `${buttonSizes.lg.paddingY} ${buttonSizes.lg.paddingX}`,
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 'normal',
        letterSpacing: '-0.01rem',
        borderRadius: 0,
      },
    },
    disabled: {
      true: {
        backgroundColor: vars.color.bg.disable,
        color: vars.color.text.onDisabled,
        cursor: 'not-allowed',
        pointerEvents: 'none' as const,
        transform: 'none',
        ':hover': {
          backgroundColor: vars.color.bg.disable,
        },
        ':active': {
          backgroundColor: vars.color.bg.disable,
          transform: 'none',
        },
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
