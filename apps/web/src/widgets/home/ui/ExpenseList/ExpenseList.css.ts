import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${vars.spacing.md} ${vars.spacing.lg2}`,
  backgroundColor: vars.color.bg.neutral.primary,
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
  marginTop: vars.spacing.md,
});
