import { style, styleVariants } from '@vanilla-extract/css';
import { vars, spacing, radius } from '@/shared/ui/theme.css';

const wrapperBase = style({
  display: 'inline-flex',
  flexDirection: 'column',
  filter:
    'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.05))',
});

export const wrapperVariants = styleVariants({
  left: [wrapperBase, { alignItems: 'flex-start' }],
  center: [wrapperBase, { alignItems: 'center' }],
  right: [wrapperBase, { alignItems: 'flex-end' }],
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem',
  padding: `${spacing.sm2} ${spacing.lg}`,
  backgroundColor: vars.color.bg.surface.secondary.default,
  borderRadius: radius.sm,
});

export const titleRow = style({
  display: 'flex',
  gap: '0.3rem',
  alignItems: 'center',
  whiteSpace: 'nowrap',
});

const arrowContainerBase = style({
  display: 'flex',
  justifyContent: 'center',
  width: '60px',
  flexShrink: 0,
});

export const arrowContainerVariants = styleVariants({
  bottom: [arrowContainerBase, { marginTop: '-3px' }],
  top: [arrowContainerBase, { marginBottom: '-3px' }],
});

export const arrowFlipped = style({
  transform: 'scaleY(-1)',
});
