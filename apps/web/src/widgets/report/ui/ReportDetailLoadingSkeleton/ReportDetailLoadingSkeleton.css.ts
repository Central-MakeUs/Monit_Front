import { style } from '@vanilla-extract/css';
import { vars, shadows } from '@/shared/ui/theme.css';
import { shimmerBlock as block } from '@/shared/ui/skeleton/skeleton.css';

export const summarySection = style({
  padding: `${vars.spacing['2xl']} ${vars.spacing.xl}`,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
});

export const badge = style([
  block,
  { height: '1.8rem', width: '8rem', borderRadius: vars.radius.xs },
]);

export const subtitle = style([block, { height: '1.6rem', width: '70%' }]);

export const titleLine1 = style([block, { height: '2.4rem', width: '85%' }]);
export const titleLine2 = style([block, { height: '2.4rem', width: '60%' }]);

export const cardList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
  padding: `0 ${vars.spacing.xl}`,
});

export const cardExpanded = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: vars.radius.md,
  boxShadow: shadows.shadow1,
  backgroundColor: vars.color.bg.surface.secondary.default,
  overflow: 'hidden',
});

export const expandedHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: `${vars.spacing['2xl']} ${vars.spacing['2xl']}`,
});

export const expandedHeaderLeft = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: vars.spacing.lg2,
});

export const expandedBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.lg2,
  padding: `0 ${vars.spacing['2xl']} ${vars.spacing['2xl']}`,
});

export const description = style([block, { height: '1.4rem', width: '90%' }]);

export const tableSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs2,
});

export const tableHeaderRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const tableRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: vars.spacing.xs,
  paddingBottom: vars.spacing.xs,
});

export const tableRowLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  width: '12.8rem',
  flexShrink: 0,
});

export const tableRowRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
});

export const tableHeaderLabel = style([block, { height: '1.1rem', width: '4rem' }]);
export const tableHeaderCount = style([block, { height: '1.1rem', width: '2.6rem' }]);
export const tableHeaderAmount = style([block, { height: '1.1rem', width: '4rem' }]);

export const tableEmoji = style([
  block,
  { width: '2.4rem', height: '2.4rem', borderRadius: vars.radius.full, flexShrink: 0 },
]);

export const tableLabel = style([block, { height: '1.3rem', width: '5rem' }]);
export const tableCount = style([block, { height: '1.3rem', width: '2.6rem', flexShrink: 0 }]);
export const tableAmount = style([block, { height: '1.3rem', width: '6rem', flexShrink: 0 }]);

export const cardCollapsed = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.spacing['2xl']} ${vars.spacing['2xl']}`,
  borderRadius: vars.radius.md,
  boxShadow: shadows.shadow1,
  backgroundColor: vars.color.bg.surface.secondary.default,
});

export const collapsedHeaderLeft = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: vars.spacing.sm2,
});

export const rankBadge = style([
  block,
  { width: '2.2rem', height: '2.2rem', borderRadius: vars.radius.xs2, flexShrink: 0 },
]);

export const categoryName = style([block, { height: '1.8rem', width: '11rem' }]);

export const chevron = style([
  block,
  {
    width: '1.6rem',
    height: '1.6rem',
    borderRadius: vars.radius.xs2,
    flexShrink: 0,
  },
]);

export const totalBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '4.6rem',
  padding: `${vars.spacing.lg} ${vars.spacing.xl}`,
});

export const totalBarLeft = style([block, { height: '1.2rem', width: '7rem' }]);
export const totalBarRight = style([block, { height: '1.4rem', width: '9rem' }]);

export const avgCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs2,
  margin: `0 ${vars.spacing.xl}`,
  padding: `${vars.spacing['2xl']} ${vars.spacing['2xl']}`,
  backgroundColor: vars.color.bg.neutral.default,
  borderRadius: vars.radius.md,
});

export const avgLabel = style([block, { height: '1.2rem', width: '7rem' }]);
export const avgComment = style([block, { height: '1.8rem', width: '85%' }]);
