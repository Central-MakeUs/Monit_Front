import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: vars.color.bg.base,
});

export const content = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const cardSection = style({
  padding: `0 ${vars.spacing.xl}`,
  marginTop: '0.3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
});
