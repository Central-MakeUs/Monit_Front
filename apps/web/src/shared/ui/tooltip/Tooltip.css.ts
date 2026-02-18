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

const wrapperHorizontalBase = style({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  filter:
    'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.05))',
});

export const wrapperHorizontalVariants = styleVariants({
  top: [wrapperHorizontalBase, { alignItems: 'flex-start' }],
  center: [wrapperHorizontalBase, { alignItems: 'center' }],
  bottom: [wrapperHorizontalBase, { alignItems: 'flex-end' }],
});

const arrowContainerHorizontalBase = style({
  display: 'flex',
  flexShrink: 0,
});

export const arrowContainerHorizontalVariants = styleVariants({
  left: [arrowContainerHorizontalBase, { marginRight: '-3px' }],
  right: [arrowContainerHorizontalBase, { marginLeft: '-3px' }],
});

export const arrowVerticalPosition = styleVariants({
  top: { alignSelf: 'flex-start', paddingTop: '8px' },
  center: { alignSelf: 'center' },
  bottom: { alignSelf: 'flex-end', paddingBottom: '8px' },
});

export const arrowRotateLeft = style({
  transform: 'rotate(90deg)',
});

export const arrowRotateRight = style({
  transform: 'rotate(-90deg)',
});
