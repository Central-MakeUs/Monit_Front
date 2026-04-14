import { style } from '@vanilla-extract/css';
import { vars, shadows } from '@/shared/ui/theme.css';

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

export const badgeWrapper = style({
  display: 'flex',
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

export const ctaButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.xs,
  width: '100%',
  height: '4.8rem',
  padding: `0 ${vars.spacing['2xl']}`,
  boxSizing: 'border-box',
  border: 'none',
  borderTop: `1px solid ${vars.color.bg.neutral.subtle}`,
  backgroundColor: vars.color.bg.surface.secondary.default,
  cursor: 'pointer',
  font: 'inherit',
  flexShrink: 0,
});

export const chevron = style({
  width: '1.6rem',
  height: '1.6rem',
  flexShrink: 0,
  fill: vars.color.icon.tertiary,
  transform: 'rotate(90deg)',
  transition: 'transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1)',
});

export const chevronExpanded = style({
  transform: 'rotate(-90deg)',
});

export const listCollapser = style({
  display: 'grid',
  gridTemplateRows: '0fr',
  transition: 'grid-template-rows 260ms cubic-bezier(0.22, 0.61, 0.36, 1)',
});

export const listCollapserExpanded = style({
  gridTemplateRows: '1fr',
});

export const listInner = style({
  overflow: 'hidden',
  minHeight: 0,
});

export const listContainer = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const listItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: `${vars.spacing.md} ${vars.spacing['2xl']}`,
  boxSizing: 'border-box',
  border: 'none',
  borderTop: `1px solid ${vars.color.bg.neutral.subtle}`,
  backgroundColor: vars.color.bg.surface.secondary.default,
  cursor: 'pointer',
  font: 'inherit',
  textAlign: 'left',
});

export const listItemChevron = style({
  width: '1.6rem',
  height: '1.6rem',
  flexShrink: 0,
  fill: vars.color.icon.tertiary,
});
