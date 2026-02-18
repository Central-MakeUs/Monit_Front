import { spacing } from '@/shared/ui/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

const sortableItemBase = style({
  position: 'relative',
});

export const sortableItem = styleVariants({
  default: [sortableItemBase, { zIndex: 'auto', opacity: 1 }],
  dragging: [sortableItemBase, { zIndex: 1000, opacity: 0.5 }],
});

export const categoryGrid = style({
  marginTop: '2.25rem',
  marginLeft: spacing.xl,
  marginRight: spacing.xl,
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  rowGap: spacing.lg2,
  columnGap: '2.6rem',
});

export const onboardingOverlay = style({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '430px',
  zIndex: 100,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
});

export const tooltipStep1 = style({
  position: 'absolute',
  top: '16.5rem',
  left: '2.5rem',
});

export const tooltipStep2 = style({
  position: 'absolute',
  top: '1rem',
  right: '4rem',
});

export const highlightItem = style({
  position: 'relative',
  zIndex: 101,
  backgroundColor: 'white',
  borderRadius: '12px',
});

export const highlightAddButton = style({
  position: 'relative',
  zIndex: 101,
});
