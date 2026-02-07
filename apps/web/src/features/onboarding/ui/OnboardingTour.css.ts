import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/shared/ui/theme.css';

export const zIndex = {
  overlay: 1000,
  highlight: 1001,
  tooltip: 1002,
};

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  background: 'transparent',
  zIndex: zIndex.overlay,
  cursor: 'pointer',
  pointerEvents: 'auto',
});

export const highlightBox = recipe({
  base: {
    position: 'fixed',
    zIndex: zIndex.highlight,
    pointerEvents: 'none',
    animation: `${fadeIn} 0.3s ease-out forwards`,
  },
  variants: {
    glow: {
      true: {
        boxShadow: `${vars.shadow.glow}, 0 0 0 9999px rgba(0,0,0,0.6)`,
      },
      false: {
        boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)',
      },
    },
  },
  defaultVariants: {
    glow: true,
  },
});

export const tooltipPositioner = style({
  position: 'fixed',
  zIndex: zIndex.tooltip,
  animation: `${fadeIn} 0.3s ease-out forwards`,
  pointerEvents: 'none',
});
