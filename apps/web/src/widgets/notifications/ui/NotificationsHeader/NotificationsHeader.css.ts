import { vars } from '@/shared/ui/theme.css';
import { style } from '@vanilla-extract/css';

export const header = style({
  backgroundColor: vars.color.bg.surface.secondary.default,
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
});
