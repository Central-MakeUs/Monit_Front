import { spacing } from '@/shared/ui/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs2,
  marginTop: '2.7rem',
});
