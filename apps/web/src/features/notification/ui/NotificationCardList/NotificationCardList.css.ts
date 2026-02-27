import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const list = style({
  display: 'flex',
  flexDirection: 'column',
});

export const divider = style({
  height: '0.1rem',
  backgroundColor: vars.color.border.default,
  margin: '0 2rem',
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8rem 0',
  gap: '0.8rem',
});
