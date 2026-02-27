import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const wrapper = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const dot = style({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: vars.color.bg.brand.default,
  pointerEvents: 'none',
});
