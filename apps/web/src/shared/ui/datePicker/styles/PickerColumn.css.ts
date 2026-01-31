import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars, typography } from '@/shared/ui/theme.css';
import { PICKER_COLUMN_HEIGHT, PICKER_ITEM_HEIGHT } from '@/shared/ui/datePicker/config/constants';

const CROSS_PADDING = (PICKER_COLUMN_HEIGHT - PICKER_ITEM_HEIGHT) / 2;

export const pickerColumn = style({
  position: 'relative',
  height: `${PICKER_COLUMN_HEIGHT}rem`,
  overflow: 'hidden',
  flex: 1,
  minWidth: '6rem',
  maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
});

export const pickerWrapper = style({
  width: '100%',
  height: '100%',
  position: 'relative',
});

export const pickerList = style({
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  scrollSnapType: 'y mandatory',
  overscrollBehaviorY: 'contain',
  paddingTop: `${CROSS_PADDING}rem`,
  paddingBottom: `${CROSS_PADDING}rem`,
  '::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
});

export const pickerItem = recipe({
  base: {
    height: `${PICKER_ITEM_HEIGHT}rem`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    scrollSnapAlign: 'center',
    transition: 'all 0.2s',
    ...typography.body.b5,
    color: vars.color.text.tertiary,
    userSelect: 'none',
  },
  variants: {
    isSelected: {
      true: {
        ...typography.body.b5,
        color: vars.color.text.primary,
      },
      false: {
        color: vars.color.text.tertiary,
      },
    },
  },
});

export const highlightOverlay = style({
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  height: `${PICKER_ITEM_HEIGHT}rem`,
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
});
