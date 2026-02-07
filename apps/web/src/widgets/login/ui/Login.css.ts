import { spacing, radius } from '@/shared/ui/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
});

export const slideContainer = style({
  display: 'flex',
  flex: 1,
  transition: 'transform 0.3s ease-out',
  touchAction: 'pan-y pinch-zoom',
});

export const slide = style({
  minWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: `0 ${spacing.xl}`,
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.4rem',
  marginTop: '4rem',
  textAlign: 'center',
});

export const onboardingImage = style({
  width: '100%',
  maxWidth: '353px',
  aspectRatio: '37 / 44',
  objectFit: 'contain',
});

export const bottomSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.lg,
  padding: `${spacing.lg} ${spacing.xl}`,
  paddingBottom: '4rem',
});

export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm2,
  width: '100%',
});

export const loginBtn = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    padding: `${spacing.md} ${spacing.sm2}`,
    height: '4.8rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.sm2,
    border: 'none',
  },
  variants: {
    social: {
      kakao: { backgroundColor: '#FEE500', color: '#000' },
      apple: { backgroundColor: '#000', color: '#fff' },
    },
  },
});

export const loginBtnIcon = style({
  position: 'absolute',
  left: spacing.md,
});
