import { vars, spacing, typography } from '@/shared/ui/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: spacing.lg,
  padding: `${spacing.md} ${spacing.lg}`,
  userSelect: 'none',
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
});

export const navButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: spacing.xs,
  display: 'flex',
  alignItems: 'center',
  color: vars.color.icon.tertiary,
});

export const iconRotate = style({
  transform: 'rotate(180deg)',
});

export const navRow = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: spacing.md,
  gap: spacing.xs2,
  cursor: 'pointer',
});

export const navText = style({
  ...typography.head.h4,
  color: vars.color.text.primary,
});

export const grid = recipe({
  base: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 0,
    justifyItems: 'center',
  },
  variants: {
    size: {
      md: {},
      lg: {
        rowGap: '1rem',
      },
      weekly: {},
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const weekdayCell = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '2rem',
  color: vars.color.text.tertiary,
  ...typography.body.b2,
});

export const weeklyGrid = style({
  display: 'flex',
  gap: '0.8rem',
  padding: '1.4rem 1.8rem',
  width: '100%',
});

export const weeklyColumn = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.6rem',
  flex: 1,
});

export const weeklyWeekdayCell = recipe({
  base: {
    ...typography.body.b1,
    color: vars.color.text.tertiary,
    textAlign: 'center',
    width: '4.4rem',
  },
  variants: {
    isSelected: {
      true: {
        color: vars.color.text.brand,
      },
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

export const weeklyCarouselContainer = style({
  width: '39rem',
  margin: '0 auto',
  overflow: 'hidden',
  position: 'relative',
});

export const weeklyCarouselTrack = style({
  display: 'flex',
  gap: 0,
  willChange: 'transform',
  backfaceVisibility: 'hidden',
});

export const weeklyCarouselSlide = style({
  width: '39rem',
  minWidth: '39rem',
  flexShrink: 0,
});

export const footer = style({
  paddingTop: spacing.md,
});

export const monthlyCarouselContainer = style({
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
});

export const monthlyCarouselTrack = style({
  display: 'flex',
  gap: 0,
  willChange: 'transform',
  backfaceVisibility: 'hidden',
});

export const monthlyCarouselSlide = style({
  width: '100%',
  minWidth: '100%',
  flexShrink: 0,
});
