import { style } from '@vanilla-extract/css';
import { vars, spacing } from '@/shared/ui/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: vars.color.bg.base,
});

export const scrollArea = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: vars.spacing['2xl'],
  overflowY: 'auto',
});

export const summarySection = style({
  padding: `${vars.spacing['2xl']} ${vars.spacing.xl}`,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
});

export const badgeWrapper = style({
  display: 'flex',
});

export const subtitleText = style({
  fontSize: vars.font.size.h3,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  letterSpacing: '-0.16px',
  lineHeight: 'normal',
});

export const titleText = style({
  fontSize: vars.font.size.t4,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
  letterSpacing: '0',
  lineHeight: '1.4',
  whiteSpace: 'pre-wrap',
});

export const cardList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
  padding: `0 ${vars.spacing.xl}`,
});

export const totalBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '4.6rem',
  padding: `${vars.spacing.lg} ${vars.spacing.xl}`,
});

export const totalBarText = style({
  fontSize: vars.font.size.b2,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
  letterSpacing: '-0.12px',
  lineHeight: '1.6',
});

export const totalBarAmountWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
});

export const totalBarAmountText = style({
  fontSize: vars.font.size.b3,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
  letterSpacing: '-0.14px',
});

export const avgCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs2,
  margin: `0 ${vars.spacing.xl}`,
  padding: `${vars.spacing['2xl']} ${vars.spacing['2xl']}`,
  backgroundColor: vars.color.bg.neutral.default,
  borderRadius: vars.radius.md,
});

export const avgLabel = style({
  fontSize: vars.font.size.b2,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
  letterSpacing: '-0.12px',
});

export const avgComment = style({
  fontSize: vars.font.size.h4,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: '-0.18px',
  lineHeight: '1.4',
});

export const emptyState = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.spacing.xl,
  fontSize: vars.font.size.b2,
  color: vars.color.text.secondary,
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
});

export const iconButton = style({
  width: '3.2rem',
  height: '3.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});
