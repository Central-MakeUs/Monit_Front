import { style } from '@vanilla-extract/css';
import { spacing } from '../../../../shared/ui/theme.css';

export const categoryGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  rowGap: spacing.md,
  columnGap: '2.6rem',
  maxHeight: 'calc((8.4rem + 1.2rem) * 4 - 1.2rem)',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
  paddingBottom: '2.5rem',
});
