import { style } from '@vanilla-extract/css';
import { vars, spacing } from '../theme.css';

export const historyCardWrapper = style({
  display: 'flex',
  padding: `${spacing.lg} ${spacing['2xl']}`,
  justifyContent: 'space-between',
  alignItems: 'center',
  background: vars.color.bg.surface.secondary.default,
  border: 'none',
  width: '100%',
});

export const contentWrapper = style({
  display: 'flex',
  gap: spacing.lg,
  alignItems: 'center',
  justifyContent: 'center',
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.3rem',
});

export const labelWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacing.sm,
});
