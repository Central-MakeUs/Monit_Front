import { spacing } from '../theme.css';
import { style } from '@vanilla-extract/css';

export const fieldWrapper = style({
  display: 'flex',
  gap: spacing['2xl'],
  alignItems: 'center',
  padding: `${spacing.md} ${spacing.xl}`,
});

export const dateWrapper = style({
  display: 'flex',
  gap: spacing.xs,
  alignItems: 'center',
});
