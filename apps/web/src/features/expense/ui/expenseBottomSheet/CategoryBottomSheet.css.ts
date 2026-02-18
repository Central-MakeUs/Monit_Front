import { style } from '@vanilla-extract/css';
import { spacing } from '../../../../shared/ui/theme.css';

// 12개 이하: 3줄 고정 높이
export const categoryGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  rowGap: spacing.lg,
  columnGap: '2.6rem',
  height: 'calc((9.5rem + 1.6rem) * 3 - 1.6rem)',
  alignContent: 'start',
});

// 12개 초과: 스크롤 가능
export const categoryGridScrollable = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  rowGap: spacing.lg,
  columnGap: '2.6rem',
  maxHeight: 'calc((8.5rem + 1.6rem) * 4 - 1.6rem)',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  paddingBottom: '2.5rem',
});
