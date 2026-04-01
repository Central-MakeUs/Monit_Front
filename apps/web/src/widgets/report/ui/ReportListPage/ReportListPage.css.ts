import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: vars.color.bg.base,
});

export const scrollArea = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing['2xl'],
  padding: `${vars.spacing['2xl']} ${vars.spacing.xl} ${vars.spacing['3xl']}`,
  overflowY: 'auto',
});

export const yearGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
});

export const yearLabel = style({
  paddingLeft: vars.spacing.xs,
});

export const iconButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  padding: 0,
});
