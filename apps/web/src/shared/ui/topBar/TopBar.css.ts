import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '0.8rem 1.8rem',
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  width: '100%',
  alignItems: 'center',
  height: '4.8rem',
});

export const leftSection = style({
  display: 'flex',
  justifySelf: 'start',
  alignItems: 'center',
});

export const centerSection = style({
  display: 'flex',
  justifySelf: 'center',
  alignItems: 'center',
});

export const rightSection = style({
  display: 'flex',
  justifySelf: 'end',
  alignItems: 'center',
});
