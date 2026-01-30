import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars, typography } from '@/shared/ui/theme.css';

export const pickerColumn = style({
  position: 'relative',
  height: '20rem',
  overflow: 'hidden',
  flex: 1,
  minWidth: '6rem',
  maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
});

export const pickerWrapper = style({
  position: 'relative',
  height: '100%',
});

export const pickerList = style({
  position: 'absolute',
  top: '8rem', // (20rem / 2) - (4rem / 2) = 8rem
  left: 0,
  right: 0,
  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  willChange: 'transform',
});

export const pickerItem = recipe({
  base: {
    height: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ...typography.body.b5,
    color: vars.color.text.tertiary,
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
  height: '4rem',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
});
