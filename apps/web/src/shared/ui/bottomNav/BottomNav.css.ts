import { style } from '@vanilla-extract/css';
import { vars } from '../theme.css';

export const container = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${vars.spacing.md} ${vars.spacing.xl}`,
  backgroundColor: 'transparent',
  zIndex: 100,
});

export const plusButtonWrapper = style({
  position: 'absolute',
  right: vars.spacing.xl,
});
