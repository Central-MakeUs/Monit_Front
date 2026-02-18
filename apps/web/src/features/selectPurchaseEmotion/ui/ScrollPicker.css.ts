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
});

export const pickerOverlay = style({
  position: 'absolute',
  top: `${(TOTAL_ITEM_HEIGHT * VISIBLE_ITEMS) / 2 - ITEM_HEIGHT / 2}px`,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '17rem',
  height: `${ITEM_HEIGHT}px`,
  backgroundColor: vars.color.primitive.static.white,
  borderBottom: `0.1rem solid ${vars.color.border.default}`,
  borderTop: `0.1rem solid ${vars.color.border.default}`,
  pointerEvents: 'none',
  zIndex: 0,
});

export const pickerList = style({
  position: 'relative',
  height: '100%',
  overflowY: 'auto',
  scrollSnapType: 'y mandatory',
  scrollBehavior: 'smooth',
  display: 'flex',
  flexDirection: 'column',
  gap: `${ITEM_GAP}px`,
  '::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
});

export const pickerPadding = style({
  height: `${(TOTAL_ITEM_HEIGHT * VISIBLE_ITEMS) / 2 - ITEM_HEIGHT / 2 - ITEM_GAP}px`, // 52px
  flexShrink: 0,
});

export const pickerItem = recipe({
  base: {
    width: '17rem',
    height: `${ITEM_HEIGHT}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    scrollSnapAlign: 'center',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    userSelect: 'none',
    position: 'relative',
    zIndex: 1,
  },
  variants: {
    active: {
      true: {
        color: vars.color.text.primary,
      },
      false: {
        color: vars.color.text.tertiary,
      },
    },
  },
});

export const PICKER_ITEM_HEIGHT = TOTAL_ITEM_HEIGHT;
