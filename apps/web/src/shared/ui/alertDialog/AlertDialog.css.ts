import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars, shadows, spacing, radius, typography } from '../theme.css';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: vars.color.bg.overlay,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});

export const dialogContainer = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.xl,
    gap: spacing.xl,
    backgroundColor: vars.color.primitive.static.white,
    borderRadius: radius.lg,
    boxShadow: shadows.shadow2,
  },
  variants: {
    variant: {
      left: {
        alignItems: 'flex-start',
        width: '300px',
      },
      center: {
        alignItems: 'center',
        width: '320px',
        minHeight: '190px',
      },
    },
  },
  defaultVariants: {
    variant: 'left',
  },
});

export const contentWrapper = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  variants: {
    variant: {
      left: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
    },
  },
  defaultVariants: {
    variant: 'left',
  },
});

export const iconWrapper = recipe({
  base: {
    width: '37px',
    height: '37px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {
    variant: {
      left: {},
      center: {
        color: vars.color.icon.brand,
      },
    },
  },
  defaultVariants: {
    variant: 'left',
  },
});

export const title = style({
  ...typography.head.h4,
  color: vars.color.text.primary,
  margin: 0,
});

export const description = style({
  ...typography.body.b3,
  color: vars.color.text.secondary,
  margin: 0,
  whiteSpace: 'pre-line',
  textAlign: 'center',
});

export const buttonGroup = styleVariants({
  dual: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
  },
  single: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
  },
});
