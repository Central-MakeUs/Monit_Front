import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars, spacing } from '../theme.css';

export const bannerWrapper = style({
  display: 'flex',
  width: '100%',
  padding: `${spacing['2xl']} ${spacing.xl}`,
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: vars.color.bg.surface.secondary.default,
  borderTop: `1px solid ${vars.color.bg.neutral.default}`,
  borderBottom: `1px solid ${vars.color.bg.neutral.default}`,
});

export const contentWrapper = style({
  display: 'flex',
  gap: spacing.lg,
  alignItems: 'center',
});

export const iconWrapper = style({
  display: 'flex',
  width: '40px',
  height: '40px',
  padding: '2px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: vars.radius.lg2,
  backgroundColor: vars.color.bg.brand.subtle,
  flexShrink: 0,
});

export const iconInner = style({
  width: '30px',
  height: '31px',
  color: vars.color.bg.brand.default,
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacing.xs,
});

export const bannerButton = recipe({
  base: {
    display: 'flex',
    padding: `${spacing.xs2} ${spacing.sm2}`,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    borderRadius: vars.radius.sm,
    border: 'none',
    cursor: 'pointer',
    flexShrink: 0,
  },
  variants: {
    active: {
      true: {
        backgroundColor: vars.color.bg.brand.default,
        color: vars.color.text.onBrand,
        ':hover': {
          backgroundColor: vars.color.bg.brand.hover,
        },
        ':active': {
          backgroundColor: vars.color.bg.brand.active,
        },
      },
      false: {
        backgroundColor: vars.color.bg.disable,
        color: vars.color.text.onDisabled,
        cursor: 'not-allowed',
        pointerEvents: 'none' as const,
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const buttonIcon = style({
  width: '16px',
  height: '16px',
});
