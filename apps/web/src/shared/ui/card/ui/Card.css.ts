import { style } from '@vanilla-extract/css';
import { vars, spacing, shadows } from '@/shared/ui/theme.css';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
  padding: `${vars.spacing['2xl']} ${vars.spacing['3xl']}`,
  boxSizing: 'border-box',
  backgroundColor: vars.color.bg.surface.secondary.default,
  borderRadius: vars.radius.md,
  boxShadow: shadows.shadow2,
});

export const fullWidth = style({
  width: '100%',
});

export const interactive = style({
  cursor: 'pointer',
});
