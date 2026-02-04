import { style } from '@vanilla-extract/css';
import { radius, spacing, vars } from '@/shared/ui/theme.css';

export const inputWrapper = style({
  marginBottom: '2.1rem',
});

export const dateSection = style({
  display: 'flex',
  gap: spacing['2xl'],
  padding: `${spacing.md} 0`,
});

export const dateButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  background: 'transparent',
  border: 'none',
  padding: 0,
});

export const dateChevron = style({
  width: '1.6rem',
  height: '1.6rem',
});

export const categorySection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
  marginBottom: '2.1rem',
});

export const categoryGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  rowGap: spacing.md,
  columnGap: '2.6rem',
});

export const buttonSection = style({
  display: 'flex',
  gap: spacing.sm,
  marginTop: 'auto',
});

export const deleteButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: `${spacing.md} ${spacing['2xl']}`,
  borderRadius: vars.radius.sm2,
  border: `1px solid ${vars.color.border.default}`,
  background: vars.color.bg.surface.secondary.default,
  color: vars.color.icon.tertiary,
  ':active': {
    backgroundColor: vars.color.bg.surface.secondary.active,
    color: vars.color.icon.disabled,
  },
});

export const badgeContainer = style({
  display: 'flex',
  padding: `${spacing.md} ${spacing.lg}`,
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacing.xs2,
  borderRadius: radius.sm2,
  background: vars.color.bg.base,
});

export const badgeList = style({
  display: 'flex',
  gap: spacing.sm,
  alignItems: 'flex-start',
});
