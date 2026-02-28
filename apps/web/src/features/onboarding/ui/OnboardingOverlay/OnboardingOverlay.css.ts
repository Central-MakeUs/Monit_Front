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

export const overlayDim = style({
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.6)',
  zIndex: zIndex.overlay,
  cursor: 'pointer',
  pointerEvents: 'auto',
});
