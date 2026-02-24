import { style } from '@vanilla-extract/css';
import { typography, vars } from '../theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs2,
  alignItems: 'flex-end',
  width: '100%',
});

export const textArea = style({
  ...typography.body.b3,
  width: '100%',
  height: '39rem',
  padding: `${vars.spacing.lg} ${vars.spacing.lg2}`,
  backgroundColor: vars.color.bg.neutral.primary,
  borderRadius: vars.radius.sm2,
  border: 'none',
  outline: 'none',
  resize: 'none',
  color: vars.color.text.primary,
  '::placeholder': {
    color: vars.color.text.tertiary,
  },
});

export const charCount = style({
  ...typography.body.b1,
  color: vars.color.text.tertiary,
});

export const charCountActive = style({
  color: vars.color.text.primary,
});

export const charCountLimit = style({
  color: vars.color.text.status.danger,
});
