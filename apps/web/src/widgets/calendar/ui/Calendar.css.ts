import { style } from '@vanilla-extract/css';
import { spacing } from '@/shared/ui/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: spacing.lg,
  padding: `${spacing.md} ${spacing.lg}`,
  userSelect: 'none',
});
