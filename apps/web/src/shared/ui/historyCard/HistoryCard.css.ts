import { style } from '@vanilla-extract/css';
import { vars, spacing } from '../theme.css';

export const historyCardWrapper = style({
  display: 'flex',
  padding: `${spacing.lg} ${spacing['2xl']}`,
  justifyContent: 'space-between',
  alignItems: 'center',
  background: vars.color.bg.surface.secondary.default,
  border: 'none',
  width: '100%',
});

export const contentWrapper = style({
  display: 'flex',
  gap: spacing.lg,
  alignItems: 'center',
  justifyContent: 'center',
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.3rem',
});

export const labelWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacing.sm,
});

// Figma: Home 소비 기록 카드 내 만족도 뱃지(node-id 5068-83692) 위치/간격을 맞추기 위한 래퍼
export const badgeWrapper = style({
  marginTop: spacing.xs2,
});
