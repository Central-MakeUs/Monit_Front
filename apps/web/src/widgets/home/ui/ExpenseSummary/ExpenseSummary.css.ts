import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: `1.15rem ${vars.spacing.xl}`,
  backgroundColor: vars.color.primitive.static.white,
  width: '100%',
});

export const summaryRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const countText = style({
  flexShrink: 0,
});

export const amountText = style({
  flexShrink: 0,
});

const blink = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});

export const blinkingText = style({
  animation: `${blink} 1.5s ease-in-out infinite`,
});
