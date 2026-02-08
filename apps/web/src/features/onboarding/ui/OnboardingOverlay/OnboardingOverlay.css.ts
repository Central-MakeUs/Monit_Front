import { style } from '@vanilla-extract/css';
import { zIndex } from '../../config/zIndex';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  background: 'transparent',
  zIndex: zIndex.overlay,
  cursor: 'pointer',
  pointerEvents: 'auto',
});
