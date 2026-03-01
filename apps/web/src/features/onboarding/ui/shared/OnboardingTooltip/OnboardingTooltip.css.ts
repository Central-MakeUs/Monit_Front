import { keyframes, style } from '@vanilla-extract/css';
import { zIndex } from '../../../config/zIndex';

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const tooltipPositioner = style({
  position: 'fixed',
  zIndex: zIndex.tooltip,
  animation: `${fadeIn} 0.3s ease-out forwards`,
  pointerEvents: 'none',
});
