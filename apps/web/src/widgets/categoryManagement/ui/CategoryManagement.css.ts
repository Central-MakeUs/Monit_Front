import { spacing } from '@/shared/ui/theme.css';
import { style } from '@vanilla-extract/css';

export const categoryGrid = style({
  marginTop: '2.25rem',
  marginLeft: spacing.xl,
  marginRight: spacing.xl,
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  rowGap: spacing.lg2,
  columnGap: '2.6rem',
});
