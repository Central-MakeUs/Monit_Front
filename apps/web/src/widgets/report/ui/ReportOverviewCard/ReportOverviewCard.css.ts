import { style } from '@vanilla-extract/css';
import { vars, shadows } from '@/shared/ui/theme.css';

export const card = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${vars.spacing.lg2} ${vars.spacing['2xl']}`,
  width: '100%',
  boxSizing: 'border-box',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
  font: 'inherit',
  backgroundColor: vars.color.bg.surface.secondary.default,
  borderRadius: vars.radius.md,
  boxShadow: shadows.shadow2,
});

export const textBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const iconWrap = style({
  flexShrink: 0,
  width: '1.6rem',
  height: '1.6rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const chevronIcon = style({
  fill: vars.color.icon.subtle,
});
