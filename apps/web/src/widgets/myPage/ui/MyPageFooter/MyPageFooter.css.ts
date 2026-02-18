import { fontWeight, spacing, vars } from '@/shared/ui/theme.css';
import { style } from '@vanilla-extract/css';

export const root = style({
  paddingTop: spacing.sm2,
  paddingLeft: spacing.xl,
  fontWeight: fontWeight.medium,
  fontSize: '1rem',
  color: vars.color.text.disabled,
});
