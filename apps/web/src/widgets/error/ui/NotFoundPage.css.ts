import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  gap: vars.spacing.lg,
  textAlign: 'center',
});

export const icon = style({
  width: '4.2rem',
  height: '4.2rem',
  color: vars.color.bg.neutral.secondary,
});

export const title = style({
  marginBottom: vars.spacing.sm2,
});

export const arrowWrapper = style({
  width: '1.6rem',
  height: '1.6rem',
  color: vars.color.icon.tertiary,
});

export const buttonContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
});

export const buttonWrapper = style({
  width: '100%',
  maxWidth: '11.6rem',
});
