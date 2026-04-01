import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const wrapper = style({
  position: 'relative',
  marginBottom: '1.1rem',
});

export const flexWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing['2xl'],
});

export const dismissBtn = style({
  position: 'absolute',
  top: vars.spacing['2xl'],
  right: vars.spacing['3xl'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.4rem',
  height: '2.4rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  color: vars.color.icon.secondary,
  zIndex: 1,
});

export const dismissIcon = style({
  width: '1rem',
  height: '1rem',
  color: vars.color.primitive.gray['300'],
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs2,
  paddingRight: vars.spacing['3xl'],
});

export const subtitle = style({
  color: vars.color.text.primary,
  fontSize: vars.font.size.t1,
  fontWeight: vars.font.weight.semibold,
  lineHeight: '140%',
});

export const imageArea = style({
  position: 'relative',
  width: '100%',
  height: '20rem',
  overflow: 'hidden',
});

export const image = style({
  objectFit: 'cover',
});

export const footer = style({
  display: 'flex',
});
