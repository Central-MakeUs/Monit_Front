import { style, styleVariants } from '@vanilla-extract/css';
import { primitiveColors, vars } from '@/shared/ui/theme.css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing['2xl'],
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
});

export const titleRow = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs2,
});

export const subtitle = style({
  color: vars.color.text.primary,
  fontSize: vars.font.size.t1,
  fontStyle: 'normal',
  fontWeight: vars.font.weight.semibold,
  lineHeight: '140%',
});

export const badgeWrapper = style({
  display: 'flex',
});

export const rankSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.lg2,
});

export const summaryHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const summaryTitleRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const barTrack = style({
  marginTop: vars.spacing.sm,
  width: '100%',
  height: '0.8rem',
  borderRadius: vars.radius.lg,
  overflow: 'hidden',
  display: 'flex',
  backgroundColor: vars.color.bg.neutral.subtle,
});

export const barSegment = styleVariants({
  0: {
    flex: '0 0 auto',
    minWidth: 0,
    backgroundColor: vars.color.bg.reportSummary.bar.strong,
  },
  1: {
    flex: '0 0 auto',
    minWidth: 0,
    backgroundColor: vars.color.bg.reportSummary.bar.medium,
  },
  2: {
    flex: '0 0 auto',
    minWidth: 0,
    backgroundColor: vars.color.bg.reportSummary.bar.light,
  },
  3: {
    flex: '0 0 auto',
    minWidth: 0,
    backgroundColor: vars.color.bg.reportSummary.bar.subtle,
  },
});

export const rankIndex = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.6rem',
  height: '2rem',
});

export const rankList = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const rankLabelTextWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
});

export const rankLabelText = style({
  color: primitiveColors.gray[700],
  fontSize: '1.3rem',
  fontWeight: vars.font.weight.medium,
  letterSpacing: '-0.013em',
});

export const countLabelText = style({
  color: vars.color.text.secondary,
  fontSize: '1.3rem',
  fontWeight: vars.font.weight.medium,
  letterSpacing: '-0.013em',
});

export const rankItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.spacing.xs2} 0`,
});

export const rankLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
});

export const rankCountIcon = style({
  width: '0.672rem',
  height: '0.65rem',
  flexShrink: 0,
  color: vars.color.icon.card,
});

export const rankDotWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0.3rem',
});

const rankDotBase = {
  width: '1.4rem',
  height: '1.4rem',
  borderRadius: vars.radius.full,
} as const;

export const rankDot = styleVariants({
  0: {
    ...rankDotBase,
    backgroundColor: vars.color.bg.reportSummary.bar.strong,
  },
  1: {
    ...rankDotBase,
    backgroundColor: vars.color.bg.reportSummary.bar.medium,
  },
  2: {
    ...rankDotBase,
    backgroundColor: vars.color.bg.reportSummary.bar.light,
  },
});

export const footer = style({
  display: 'flex',
});
