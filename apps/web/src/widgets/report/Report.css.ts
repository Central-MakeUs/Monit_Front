import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: vars.color.bg.base,
  paddingBottom: '10rem',
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

export const errorState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.md,
  padding: vars.spacing.xl,
  fontSize: vars.font.size.b2,
  color: vars.color.text.secondary,
  textAlign: 'center',
});

export const retryButton = style({
  padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
  border: `1px solid ${vars.color.border.default}`,
  borderRadius: vars.radius.md,
  background: vars.color.bg.surface.primary.default,
  color: vars.color.text.primary,
  fontSize: vars.font.size.b3,
  cursor: 'pointer',
});
