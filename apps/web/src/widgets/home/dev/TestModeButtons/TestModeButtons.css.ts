import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const container = style({
  position: 'fixed',
  bottom: '100px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: vars.spacing.sm,
  padding: vars.spacing.md,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  borderRadius: '12px',
  zIndex: 1000,
  backdropFilter: 'blur(10px)',
});

export const button = style({
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  backgroundColor: vars.color.primitive.static.white,
  color: vars.color.text.primary,
  border: 'none',
  borderRadius: '8px',
  fontSize: '1.2rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',
  ':hover': {
    opacity: 0.8,
  },
});

export const buttonActive = style({
  backgroundColor: vars.color.primitive.blue[500],
  color: vars.color.primitive.static.white,
});
