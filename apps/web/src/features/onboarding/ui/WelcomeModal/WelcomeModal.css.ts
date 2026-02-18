import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: vars.zIndex.overlay,
});

export const content = style({
  backgroundColor: vars.color.bg.base,
  borderRadius: vars.radius.md,
  padding: vars.spacing.lg,
  width: '90%',
  maxWidth: '320px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  boxShadow: vars.shadow.shadow2,
});

export const title = style({
  marginBottom: vars.spacing.sm,
  color: vars.color.text.primary,
});

export const description = style({
  marginBottom: vars.spacing.lg,
  color: vars.color.text.secondary,
});

export const buttonWrapper = style({
  width: '100%',
});
