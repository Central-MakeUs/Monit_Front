import { style } from '@vanilla-extract/css';
import { vars } from '../theme.css';

export const wrapper = style({
  display: 'flex',
  position: 'relative',
});

export const input = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

export const track = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  width: '4rem',
  height: '2.4rem',
  padding: '0.3rem',
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.bg.neutral.secondary,
  transition: 'background-color 0.2s ease',
  boxShadow: `0 0 2px 0 rgba(0, 0, 0, 0.12) inset`,
  selectors: {
    [`${input}:checked + &`]: {
      backgroundColor: vars.color.text.status.success,
    },
  },
});

export const knob = style({
  width: '1.8rem',
  height: '1.8rem',
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.bg.neutral.subtle,
  boxShadow: `0 1px 2px 0 ${vars.color.primitive.static.shadow.shadow2}, 0 0 2px 0 ${vars.color.primitive.static.shadow.shadow2}`,
  transition: 'transform 0.2s ease',
  transform: 'translateX(0)',

  selectors: {
    [`${input}:checked ~ label &`]: {
      transform: 'translateX(1.6rem)',
    },
  },
});
