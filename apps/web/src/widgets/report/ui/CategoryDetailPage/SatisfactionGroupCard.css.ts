import { style } from '@vanilla-extract/css';
import { primitiveColors, vars, shadows } from '@/shared/ui/theme.css';

// ─── Section ───────────────────────────────────────────────────────────────
export const section = style({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: vars.spacing['2xl'], // 20px
  paddingBottom: vars.spacing['2xl'], // 20px
  gap: vars.spacing.xs2, // 6px between section header and body
  backgroundColor: vars.color.bg.surface.secondary.default,
  boxShadow: shadows.shadow1,
  width: '100%',
});

// ─── Section header ────────────────────────────────────────────────────────
// px-18px (Figma: px-[var(--list-header/total-bar/padding/horizontal,18px)])

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: vars.spacing.lg2, // 18px
  paddingRight: vars.spacing.lg2, // 18px
  cursor: 'pointer',
  userSelect: 'none',
});

export const sectionHeaderLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm2, // 10px between rank badge and label
});

// Dark circle badge — same token usage as CategoryCard rankBadge
export const rankBadge = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.2rem',
  height: '2.2rem',
  borderRadius: vars.radius.full,
  flexShrink: 0,
  backgroundColor: primitiveColors.gray[700],
});

export const rankText = style({
  color: vars.color.text.onBrand,
  fontSize: vars.font.size.b1,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: '-0.12px',
});

export const sectionLabel = style({
  fontSize: vars.font.size.h3,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: '-0.16px',
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

// ─── Section body ──────────────────────────────────────────────────────────
// flex-col with gap-6px between list header, divider, and transaction rows

export const sectionBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs2, // 6px
  width: '100%',
});

// ─── List header row ───────────────────────────────────────────────────────
// "N건의 소비" | "총 N원"  —  px-18px, py-12px (h-42px total)

export const listHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: vars.spacing.lg2, // 18px
  paddingRight: vars.spacing.lg2, // 18px
  paddingTop: vars.spacing.md, // 12px
  paddingBottom: vars.spacing.md, // 12px
});

export const listHeaderCount = style({
  fontSize: vars.font.size.b2,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
  letterSpacing: '-0.12px',
  lineHeight: '1.6',
});

export const listHeaderAmount = style({
  fontSize: vars.font.size.b2,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: '-0.12px',
});

// ─── Divider wrapper ───────────────────────────────────────────────────────
// Figma divider is w-354px on a 390px screen = 18px inset each side
// Using px-18px wrapper so <Divider /> renders at the correct inset width

export const dividerWrapper = style({
  paddingLeft: vars.spacing.lg2, // 18px
  paddingRight: vars.spacing.lg2, // 18px
});

// ─── Transaction row ───────────────────────────────────────────────────────
// px-20px, py-14px (Figma: padding/horizonta 20px, padding/vertical 14px)
// 14px has no semantic token — raw value documented below

export const transactionRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: vars.spacing.xl, // 20px ✓ token
  paddingRight: vars.spacing.xl, // 20px ✓ token
  paddingTop: '1.4rem', // 14px — no token at this size (between md=12 and lg=16)
  paddingBottom: '1.4rem', // 14px — no token at this size
  backgroundColor: vars.color.bg.surface.secondary.default,
});

export const rowLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.4rem', // 14px — Figma --history-card/spacing/gap, no token
  minWidth: 0,
  flex: 1,
});

// ─── Icon box ─────────────────────────────────────────────────────────────
// Mirrors CategoryBtn size='sm' type='primary' visual dimensions (CategoryBtn.css.ts)
// 36px container, 24px icon, 12px radius, bg.base, inset shadow

export const iconBox = style({
  width: '3.6rem',
  height: '3.6rem',
  borderRadius: '1.2rem', // CategoryBtn sm radius — no token at this size
  backgroundColor: vars.color.bg.base,
  boxShadow: 'inset 0 0 0.125rem 0 rgba(0, 0, 0, 0.08)', // from CategoryBtn.css.ts
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const iconSvg = style({
  width: '2.4rem',
  height: '2.4rem',
  display: 'block',
  flexShrink: 0,
});

// ─── Text group ────────────────────────────────────────────────────────────

export const textGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem', // 3px — same as HistoryCard.css.ts textWrapper
  minWidth: 0,
  overflow: 'hidden',
});

export const merchantName = style({
  fontSize: vars.font.size.b3, // typo/body/md = 14px
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
  letterSpacing: '-0.14px',
  lineHeight: '1.4',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const categoryText = style({
  fontSize: vars.font.size.b1, // typo/body/xs = 11px
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.tertiary,
  letterSpacing: '-0.11px',
  lineHeight: 'normal',
});

// ─── Amount ────────────────────────────────────────────────────────────────
// Figma: button/typo/size/md = 16px, semibold, right-aligned, w-80px

export const amount = style({
  fontSize: vars.font.size.h3, // button/typo/size/md = 16px
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: '-0.16px',
  lineHeight: 'normal',
  flexShrink: 0,
  textAlign: 'right',
  width: '8rem', // 80px — Figma w-[80px]
});
