import { radius, shadows, spacing, vars } from '@/shared/ui/theme.css';
import { style } from '@vanilla-extract/css';

export const reviewCardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: `3.2rem ${spacing.xl}`,
  gap: spacing.lg,
  alignItems: 'flex-start',
  backgroundColor: vars.color.bg.surface.secondary.default,
  borderRadius: radius.lg,
  boxShadow: shadows.shadow1,
  width: '100%',
  position: 'relative',
});

export const pageCount = style({
  display: 'flex',
  position: 'absolute',
  top: spacing.xl,
  right: spacing.xl,
  padding: `${spacing.xs} ${spacing.sm2}`,
  borderRadius: radius.full,
  backgroundColor: vars.color.bg.neutral.subtle,
  gap: '0.1rem',
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
});

export const iconWrapper = style({
  marginLeft: '-0.8rem',
});
