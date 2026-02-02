import { spacing } from '@/shared/ui/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '0 1.8rem',
  marginTop: '4rem',
  gap: spacing.sm,
});
