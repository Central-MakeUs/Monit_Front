import { spacing, vars } from '@/shared/ui/theme.css';
import { style } from '@vanilla-extract/css';

export const divider = style({
  display: 'flex',
  margin: `${spacing.md} ${spacing.xl}`,
  height: '1px',
  backgroundColor: vars.color.border.default,
});
