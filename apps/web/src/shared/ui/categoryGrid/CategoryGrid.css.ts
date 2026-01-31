import { style } from '@vanilla-extract/css';
import { spacing, vars } from '@/shared/ui/theme.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
});

export const countBadge = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: `${spacing.xs} ${spacing.sm}`,
  borderRadius: vars.radius.xs,
  backgroundColor: vars.color.bg.brand.default,
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  rowGap: spacing.md,
  columnGap: '2.6rem',
});
