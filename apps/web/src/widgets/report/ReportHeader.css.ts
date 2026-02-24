import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const headerActions = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.spacing.sm,
});

export const iconButton = style({
  width: '3.2rem',
  height: '3.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});

export const settingIc = style({
  width: '3.2rem',
  height: '3.2rem',
  fill: vars.color.bg.neutral.secondary,
});
