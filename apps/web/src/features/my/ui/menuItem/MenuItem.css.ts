import { spacing } from '@/shared/ui/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  margin: `${spacing.md} ${spacing.xl}`,
  justifyContent: 'space-between',
  border: 'none',
  backgroundColor: 'transparent',
});
