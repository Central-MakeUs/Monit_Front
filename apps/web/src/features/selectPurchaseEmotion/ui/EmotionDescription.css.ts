import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const descriptionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.md,
  padding: `${vars.spacing.xl} ${vars.spacing.lg}`,
});

export const tagsContainer = style({
  display: 'flex',
  gap: vars.spacing.xs2,
  justifyContent: 'center',
});

export const tag = style({
  padding: `${vars.spacing.xs2} ${vars.spacing.sm2}`,
  borderRadius: vars.radius.full,
  border: `1px solid ${vars.color.border.default}`,
  backgroundColor: vars.color.primitive.static.white,
});
