import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const dateButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.7,
  },
});

export const dateText = style({
  color: vars.color.text.primary,
});

export const dropdownIcon = style({
  width: '1.6rem',
  height: '1.6rem',
  transform: 'rotate(90deg)',
  fill: vars.color.icon.primary,
});

export const headerActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xl,
});

export const iconButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});

export const icon = style({
  fill: vars.color.icon.tertiary,
});

export const alarmIc = style({
  width: '2rem',
  height: '2.36rem',
});

export const menuIc = style({
  width: '2.2rem',
  height: '1.6rem',
});
