import { style, styleVariants } from '@vanilla-extract/css';
import { spacing, vars } from '@/shared/ui/theme.css';

export const cardBase = style({
  display: 'flex',
  gap: spacing.md,
  padding: `${spacing.xl} ${spacing.xl}`,
});

export const cardVariants = styleVariants({
  default: [cardBase, { backgroundColor: vars.color.bg.surface.secondary.default }],
  active: [cardBase, { backgroundColor: vars.color.bg.surface.secondary.active }],
  unread: [cardBase, { backgroundColor: vars.color.bg.brand.unread }],
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  flex: 1,
});

export const icon = style({
  width: '2.4rem',
  height: '2.4rem',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
});
