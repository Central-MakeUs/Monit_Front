import { spacing } from '@/shared/ui/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  marginTop: '4rem',
  gap: spacing.sm,
});
