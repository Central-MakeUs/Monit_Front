import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const pickerContainer = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
  padding: '1.6rem',
  userSelect: 'none',
});

export const highlightLine = style({
  position: 'absolute',
  top: '50%',
  left: '1.6rem',
  right: '1.6rem',
  height: '4rem',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  borderTop: `1px solid ${vars.color.border.default}`,
  borderBottom: `1px solid ${vars.color.border.default}`,
});

export const separator = style({
  fontSize: '18px',
  padding: '0 4px',
});
