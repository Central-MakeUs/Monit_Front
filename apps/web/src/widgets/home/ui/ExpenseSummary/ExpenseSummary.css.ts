import { style } from '@vanilla-extract/css';
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
