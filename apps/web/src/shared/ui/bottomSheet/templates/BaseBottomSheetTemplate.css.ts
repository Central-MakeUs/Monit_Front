import { style } from '@vanilla-extract/css';
import { spacing } from '../../theme.css';

export const baseBottomSheetTemplate = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
});

export const content = style({
  flex: 1,
  overflowY: 'auto',
  padding: `0 ${spacing['2xl']} ${spacing['2xl']}`,
});

// BottomSheetHeader Styles
export const bottomSheetHeaderWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const headerIcon = style({
  width: '1.5rem',
  height: '1.5rem',
});

export const BottomSheetHeaderBtn = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  whiteSpace: 'nowrap',
  border: 'none',
});

//BottomSheetButtonSection
export const bottomSheetButtonSection = style({
  display: 'flex',
  width: '100%',
  gap: spacing.sm,
});

// BottomSheetButton
export const bottomSheetButton = style({
  position: 'relative',
  zIndex: 1,
});

// BottomSheetButton gradient wrapper
export const bottomSheetButtonWrapper = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '10rem',
  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 45%)',
  pointerEvents: 'none',
});
