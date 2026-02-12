import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  padding: `0 ${vars.spacing.xl}`,
  margin: '2.95rem 0 1.3rem 0',
});

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
});

export const labelText = style({
  color: vars.color.text.secondary,
});

export const amountText = style({
  color: vars.color.text.primary,
});

export const viewToggleWrapper = style({
  display: 'flex',
  marginBottom: '0.3rem',
});

const blink = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});

export const blinkingText = style({
  animation: `${blink} 1.5s ease-in-out infinite`,
});
