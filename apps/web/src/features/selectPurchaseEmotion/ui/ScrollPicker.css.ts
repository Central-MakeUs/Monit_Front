import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/shared/ui/theme.css';

const ITEM_HEIGHT = 48;
const ITEM_GAP = 8; // vars.spacing.sm = 0.8rem
const TOTAL_ITEM_HEIGHT = ITEM_HEIGHT + ITEM_GAP;
const VISIBLE_ITEMS = 3; // 3개만 보이게

export const pickerContainer = style({
  position: 'relative',
  height: `${TOTAL_ITEM_HEIGHT * VISIBLE_ITEMS}px`,
  overflow: 'hidden',
  flex: 1,
});

export const pickerList = style({
  position: 'relative',
  height: '100%',
  overflowY: 'auto',
  scrollSnapType: 'y mandatory',
  scrollBehavior: 'smooth',
  '::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
});

export const pickerPadding = style({
  height: `${TOTAL_ITEM_HEIGHT}px`, // 1개 높이 (3개 중 가운데가 선택되도록)
});

export const pickerItem = recipe({
  base: {
    maxWidth: '19.2rem',
    padding: '1.2rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    scrollSnapAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    userSelect: 'none',
    marginBottom: vars.spacing.sm,
  },
  variants: {
    active: {
      true: {
        color: vars.color.text.primary,
        backgroundColor: vars.color.primitive.static.white,
        borderBottom: `0.1rem solid ${vars.color.border.default}`,
        borderTop: `0.1rem solid ${vars.color.border.default}`,
      },
      false: {
        color: vars.color.text.tertiary,
      },
    },
  },
});

export const PICKER_ITEM_HEIGHT = TOTAL_ITEM_HEIGHT;
