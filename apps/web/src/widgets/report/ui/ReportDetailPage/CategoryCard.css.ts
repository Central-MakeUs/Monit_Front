import { style } from '@vanilla-extract/css';
import { primitiveColors, vars, shadows } from '@/shared/ui/theme.css';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: vars.radius.md,
  boxShadow: shadows.shadow1,
  overflow: 'hidden',
});

export const cardDefault = style([
  card,
  { backgroundColor: vars.color.bg.surface.secondary.default },
]);

export const cardDisabled = style([card, { backgroundColor: vars.color.bg.neutral.default }]);

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.spacing['2xl']} ${vars.spacing['2xl']}`,
  cursor: 'pointer',
});

export const headerDisabled = style([header, { cursor: 'default' }]);

// active/collapsed: column layout (rank above name)
export const headerLeft = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: vars.spacing.lg2, // 16px
});

// disabled: row layout (rank + name side by side)
export const headerLeftRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: vars.spacing.sm2, // 10px
});

export const rankBadge = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.2rem',
  height: '2.2rem',
  borderRadius: vars.radius.xs2,
  flexShrink: 0,
});

export const rankBadgeActive = style([rankBadge, { backgroundColor: primitiveColors.gray[700] }]);

export const rankBadgeDisabled = style([rankBadge, { backgroundColor: vars.color.text.secondary }]);

export const rankText = style({
  color: vars.color.text.onBrand,
  fontSize: vars.font.size.b1,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: '-0.12px',
});

export const categoryName = style({
  fontSize: vars.font.size.h4,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: '-0.18px',
});

export const categoryNameDisabled = style([categoryName, { color: vars.color.text.secondary }]);

export const noDataText = style({
  fontSize: vars.font.size.b2,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.tertiary,
  letterSpacing: '-0.12px',
});

export const chevron = style({
  width: '1.6rem',
  height: '1.6rem',
  flexShrink: 0,
  color: vars.color.icon.card,
  transition: 'transform 0.2s ease',
});

export const chevronOpen = style([chevron, { transform: 'rotate(-90deg)' }]);

export const chevronClosed = style([chevron, { transform: 'rotate(90deg)' }]);

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.lg2, // 16px between description and table section
  padding: `0 ${vars.spacing['2xl']} ${vars.spacing['2xl']}`,
});

export const description = style({
  fontSize: vars.font.size.b3,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
  lineHeight: '1.4',
  letterSpacing: '-0.14px',
});

// Outer wrapper: gap 6px between header row / divider / data rows / divider / bottom
export const tableSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs2, // 6px
});

// Header row mirrors data row layout so columns align
export const tableHeaderRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const tableHeaderBase = style({
  fontSize: vars.font.size.b1,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.tertiary,
  letterSpacing: '-0.11px',
});

export const tableHeaderLabel = tableHeaderBase;

export const tableHeaderRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2rem', // 20px — mirrors rowRight gap
});

export const tableHeaderCount = style([
  tableHeaderBase,
  { width: '2.6rem', textAlign: 'center', flexShrink: 0 },
]);

export const tableHeaderAmount = style([
  tableHeaderBase,
  { width: '9rem', textAlign: 'right', flexShrink: 0 },
]);

export const tableRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: vars.spacing.xs, // 4px
  paddingBottom: vars.spacing.xs, // 4px
});

// Fixed width matching Figma w-[128px] — prevents wrapping
export const rowLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  width: '12.8rem',
  flexShrink: 0,
});

// Gap 20px between count and amount columns
export const rowRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2rem', // 20px
  opacity: 0.8,
});

export const emoji = style({
  width: '2.4rem',
  height: '2.4rem',
  flexShrink: 0,
});

export const satisfactionLabel = style({
  fontSize: '1.3rem',
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
  letterSpacing: '-0.13px',
  whiteSpace: 'nowrap',
});

export const rowCount = style({
  fontSize: '1.3rem',
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
  letterSpacing: '-0.13px',
  width: '2.6rem',
  textAlign: 'center',
  flexShrink: 0,
});

export const rowAmount = style({
  fontSize: '1.3rem',
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
  letterSpacing: '-0.13px',
  width: '9rem',
  textAlign: 'right',
  flexShrink: 0,
});

// Wraps totalRow + viewDetailRow with 4px gap
export const bottomSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs, // 4px
  width: '100%',
});

export const totalRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: vars.spacing.sm2, // 10px
  paddingBottom: vars.spacing.sm2, // 10px
});

export const totalCountText = style({
  fontSize: vars.font.size.b2,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
  letterSpacing: '-0.12px',
  lineHeight: '1.6',
});

export const totalAmountWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs, // 4px
});

export const totalAmountLabel = style({
  fontSize: vars.font.size.b3,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
  letterSpacing: '-0.14px',
  lineHeight: '1.4',
});

export const viewDetailRow = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: vars.spacing.xs, // 4px
});

export const viewDetailText = style({
  fontSize: vars.font.size.b1,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.tertiary,
  letterSpacing: '-0.11px',
  cursor: 'pointer',
});

export const viewDetailIcon = style({
  width: '1.6rem',
  height: '1.6rem',
  color: vars.color.text.tertiary,
  flexShrink: 0,
});
