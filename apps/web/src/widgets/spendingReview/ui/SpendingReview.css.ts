import { radius, shadows, spacing, vars } from '@/shared/ui/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  marginRight: '1.8rem',
  marginLeft: '1.8rem',
  marginTop: '2rem',
});

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

export const situationWrapper = style({
  display: 'flex',
  width: '100%',
  gap: spacing.lg,
  padding: `${spacing.md} ${spacing.xl}`,
  borderRadius: radius.sm,
  backgroundColor: vars.color.bg.base,
  alignItems: 'center',
});

export const badgeContainer = style({
  display: 'flex',
  padding: `${spacing.xs} ${spacing.sm}`,
  borderRadius: radius.xs,
  backgroundColor: vars.color.bg.neutral.subtle,
  border: `0.08rem solid ${vars.color.border.default}`,
});

export const pageIndicatorWrapper = style({
  marginTop: '1.4rem',
  display: 'flex',
  justifyContent: 'center',
});

export const carouselContainer = style({
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
});

export const carouselTrack = style({
  display: 'flex',
  gap: 0,
  willChange: 'transform',
  backfaceVisibility: 'hidden',
});

export const carouselSlide = style({
  width: '100%',
  minWidth: '100%',
  flexShrink: 0,
  padding: `0 ${spacing.xl}`,
  marginTop: '1.25rem',
  boxSizing: 'border-box',
});
