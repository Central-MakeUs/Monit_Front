import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const container = style({
  flex: 1,
  backgroundColor: vars.color.primitive.static.white,
  display: 'flex',
  flexDirection: 'column',
});

export const expenseSection = style({
  flex: 1,
});

export const emptySection = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: vars.spacing['2xl'],
});

export const loadingWrapper = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
