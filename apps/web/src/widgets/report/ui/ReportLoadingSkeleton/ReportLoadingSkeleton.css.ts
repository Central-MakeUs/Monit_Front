import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/ui/theme.css';
import { shimmerBlock as block } from '@/shared/ui/skeleton/skeleton.css';

export const stack = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
});

export const overviewCard = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.spacing.lg2} ${vars.spacing['2xl']}`,
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: vars.color.bg.surface.secondary.default,
  borderRadius: vars.radius.md,
});

export const overviewTextBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const overviewTopText = style([block, { height: '1.2rem', width: '6rem' }]);

export const overviewBottomText = style([block, { height: '1.6rem', width: '12rem' }]);

export const overviewChevron = style([
  block,
  { width: '1.6rem', height: '1.6rem', borderRadius: vars.radius.xs2, flexShrink: 0 },
]);

export const summaryCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing['2xl'],
  padding: `${vars.spacing['2xl']} ${vars.spacing['3xl']}`,
  boxSizing: 'border-box',
  backgroundColor: vars.color.bg.surface.secondary.default,
  borderRadius: vars.radius.md,
  width: '100%',
});

export const summaryHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
});

export const summaryTitleRow = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs2,
});

export const summaryCardTitle = style([block, { height: '1.2rem', width: '8rem' }]);

export const summarySubtitleLine1 = style([block, { height: '1.8rem', width: '60%' }]);
export const summarySubtitleLine2 = style([block, { height: '1.8rem', width: '50%' }]);

export const summaryBadge = style([
  block,
  {
    height: '1.8rem',
    width: '8rem',
    borderRadius: vars.radius.xs,
  },
]);

export const summarySection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.lg2,
});

export const summarySectionHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const sectionTitle = style([block, { height: '1.2rem', width: '6rem' }]);

export const sectionAmount = style([block, { height: '1.8rem', width: '10rem' }]);

export const bar = style([
  block,
  {
    marginTop: vars.spacing.sm,
    height: '0.8rem',
    width: '100%',
    borderRadius: vars.radius.lg,
  },
]);

export const rankList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const rankItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.spacing.xs2} 0`,
});

export const rankItemLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
});

export const rankIndex = style([
  block,
  {
    width: '1.6rem',
    height: '1.4rem',
    borderRadius: vars.radius.xs2,
  },
]);

export const rankDot = style([
  block,
  {
    width: '1.4rem',
    height: '1.4rem',
    borderRadius: vars.radius.full,
    margin: '0.3rem',
  },
]);

export const rankLabel = style([block, { height: '1.3rem', width: '7rem' }]);

export const rankAmount = style([block, { height: '1.3rem', width: '6rem' }]);

export const button = style([
  block,
  {
    height: '4.8rem',
    width: '100%',
    borderRadius: vars.radius.sm2,
  },
]);
