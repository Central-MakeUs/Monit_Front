import { vars } from '@/shared/ui/theme.css';
import { style } from '@vanilla-extract/css';

export const divider = style({
  display: 'flex',
  height: '1px',
  backgroundColor: vars.color.border.default,
  width: '100%',
});
