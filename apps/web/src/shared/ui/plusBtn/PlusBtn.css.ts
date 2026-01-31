import { style } from '@vanilla-extract/css';
import { vars } from '../theme.css';

export const button = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radius.full,
  border: 'none',
  width: '6rem',
  height: '6rem',
  padding: '1.2rem',
  backgroundColor: vars.color.bg.surface.primary.default,
  gap: '0.8rem',
  transition: 'background-color 0.15s ease-out, transform 0.1s ease-out, box-shadow 0.15s ease-out',
  ':active': {
    backgroundColor: vars.color.bg.surface.primary.active,
    transform: 'scale(0.95)',
  },
});

export const icon = style({
  width: '2.2rem',
  height: '2.2rem',
  color: vars.color.icon.subtle,
});
