import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const container = style({
  padding: `${vars.spacing.lg} 0`,
  overflow: 'hidden',
});
