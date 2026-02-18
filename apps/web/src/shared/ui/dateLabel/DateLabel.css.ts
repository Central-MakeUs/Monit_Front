import { style } from '@vanilla-extract/css';
import { primitiveColors, spacing } from '../tokens';

export const container = style({
  display: 'flex',
  padding: `${spacing.md} 0`,
  gap: spacing.sm,
  alignItems: 'center',
});

export const iconContainer = style({
  width: '2.4rem',
  height: '2.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const icon = style({
  width: '1.65rem',
  height: '1.725rem',
  display: 'block',
  color: primitiveColors.gray[600],
});
