import { vars } from '@/shared/ui/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100dvh',
  justifyContent: 'space-between',
  backgroundColor: vars.color.bg.surface.secondary.default,
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 2rem',
  gap: '1.22rem',
  marginTop: '7.5rem',
  alignItems: 'flex-start',
});

export const tileWrapper = style({
  marginBottom: '7rem',
});

export const allAgreeTileWrapper = style({
  padding: '0 1.8rem',
  marginBottom: '2rem',
});

export const agreeTileWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});
