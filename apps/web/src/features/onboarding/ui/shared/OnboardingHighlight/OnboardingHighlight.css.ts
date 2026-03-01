import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/shared/ui/theme.css';
import { zIndex } from '../../../config/zIndex';

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
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
