import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../theme.css';

const shimmer = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

export const shimmerBlock = style({
  background: `linear-gradient(
    90deg,
    ${vars.color.bg.neutral.subtle} 0%,
    rgba(0, 0, 0, 0.06) 50%,
    ${vars.color.bg.neutral.subtle} 100%
  )`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.4s ease-in-out infinite`,
  borderRadius: vars.radius.sm,
});
