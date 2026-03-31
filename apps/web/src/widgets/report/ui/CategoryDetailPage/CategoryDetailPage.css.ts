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

// Period badge + page title — mirrors ReportDetailPage summarySection
export const summarySection = style({
  padding: `${vars.spacing['2xl']} ${vars.spacing.xl}`,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
});

export const labelWrapper = style({
  display: 'flex',
});

export const label = style({
  color: vars.color.text.secondary,
});

export const titleText = style({
  fontSize: vars.font.size.t4,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
  letterSpacing: '0',
  lineHeight: '1.45',
  whiteSpace: 'pre-wrap',
});

// Total summary bar — mirrors ReportDetailPage totalBar
export const totalBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.spacing.lg} ${vars.spacing.xl}`,
  marginBottom: vars.spacing.sm,
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

// Section list: full-width, sections span edge-to-edge.
export const groupList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md, // 12px between sections
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
