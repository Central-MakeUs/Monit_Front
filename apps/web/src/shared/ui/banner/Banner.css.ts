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

export const iconWrapper = recipe({
  base: {
    display: 'flex',
    width: '4.4rem',
    height: '4.4rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vars.radius.xxxl,
    boxShadow: vars.shadow.ratingBtn,
    flexShrink: 0,
  },
  variants: {
    state: {
      today: { backgroundColor: vars.color.bg.base },
      success1: { backgroundColor: vars.color.bg.accent.red.subtle },
      success2: { backgroundColor: vars.color.bg.brand.subtle },
      success3: { backgroundColor: vars.color.bg.accent.yellow.subtle },
      success4: { backgroundColor: vars.color.bg.accent.green.subtle },
      success5: { backgroundColor: vars.color.bg.accent.blue.subtle },
    },
  },
  defaultVariants: {
    state: 'today',
  },
});

export const emojiIcon = style({
  width: '2.8rem',
  height: '2.8rem',
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
    variant: {
      disabled: {
        backgroundColor: vars.color.bg.disable,
        color: vars.color.text.onDisabled,
        cursor: 'not-allowed',
        pointerEvents: 'none' as const,
      },
      active: {
        backgroundColor: vars.color.bg.brand.default,
        color: vars.color.text.onBrand,
        ':hover': {
          backgroundColor: vars.color.bg.brand.hover,
        },
        ':active': {
          backgroundColor: vars.color.bg.brand.active,
        },
      },
      hidden: {
        opacity: 0,
        pointerEvents: 'none' as const,
        backgroundColor: vars.color.bg.disable,
        color: vars.color.text.onDisabled,
      },
    },
  },
  defaultVariants: {
    variant: 'disabled',
  },
});

export const buttonIcon = style({
  width: '16px',
  height: '16px',
});
