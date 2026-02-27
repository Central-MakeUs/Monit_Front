import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const container = style({
  backgroundColor: vars.color.bg.surface.secondary.default,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});
