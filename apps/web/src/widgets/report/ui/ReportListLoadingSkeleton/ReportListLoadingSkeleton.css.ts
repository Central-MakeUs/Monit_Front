import { style } from '@vanilla-extract/css';
import { vars, shadows } from '@/shared/ui/theme.css';
import { shimmerBlock as block } from '@/shared/ui/skeleton/skeleton.css';

export const yearGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
});

export const yearLabel = style([
  block,
  {
    height: '1.2rem',
    width: '4rem',
    marginLeft: vars.spacing.xs,
  },
]);

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: vars.color.bg.surface.secondary.default,
  borderRadius: vars.radius.md,
  boxShadow: shadows.shadow2,
  overflow: 'hidden',
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
  padding: `${vars.spacing.lg2} ${vars.spacing['2xl']}`,
});

export const contentBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs2,
});

export const badge = style([
  block,
  {
    height: '1.8rem',
    width: '6rem',
    borderRadius: vars.radius.xs,
  },
]);

export const contentTop = style([block, { height: '1.2rem', width: '5rem' }]);

export const contentBottom = style([block, { height: '1.6rem', width: '10rem' }]);

export const ctaArea = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.xs,
  width: '100%',
  height: '4.8rem',
  boxSizing: 'border-box',
  borderTop: `1px solid ${vars.color.bg.neutral.subtle}`,
  backgroundColor: vars.color.bg.surface.secondary.default,
});

export const ctaText = style([block, { height: '1.2rem', width: '8rem' }]);
