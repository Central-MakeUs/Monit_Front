import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../theme.css';

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  gap: '1.6rem',
});

export const spinner = style({
  width: '3.6rem',
  height: '3.6rem',
  border: '3px solid #e5e7eb',
  borderTop: `3px solid ${vars.color.bg.brand.default}`,
  borderRadius: '50%',
  animation: `${spin} 0.8s linear infinite`,
});

export const message = style({
  color: '#6b7280',
  fontSize: '1.4rem',
});
