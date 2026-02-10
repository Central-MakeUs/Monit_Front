import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: vars.color.bg.surface.secondary.default,
});

export const topSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '4.5rem 1.8rem 0',
  gap: '1.6rem',
  flex: 1,
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

export const normalText = style({
  color: vars.color.text.primary,
  fontFamily: vars.font.family.suit,
  fontSize: '3rem',
  fontWeight: 500,
  lineHeight: '148%',
  letterSpacing: '-0.03rem',
});

export const boldText = style({
  fontWeight: 800,
});

export const bigGrayLogo = style({
  position: 'absolute',
  bottom: '10rem',
  right: '-4rem',
  width: '28rem',
  height: 'auto',
  pointerEvents: 'none',
  zIndex: 0,
});

export const buttonWrapper = style({
  position: 'relative',
  zIndex: 1,
  paddingBottom: '3.4rem',
});
