import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/shared/ui/theme.css';

const WHEEL_SIZE = '36rem';
const CENTER_CIRCLE_SIZE = '16.2rem';

export const wheelContainer = style({
  position: 'relative',
  width: '18rem', // WHEEL_SIZE / 2 -> 휠이 보이는 영역(현재는 절반만)
  height: '40rem',
  overflow: 'visible',
});

export const wheel = style({
  position: 'absolute',
  width: WHEEL_SIZE,
  height: WHEEL_SIZE,
  borderRadius: '50%',
  background: vars.color.bg.base,
  border: `0.8rem solid ${vars.color.primitive.static.white}`,
  left: '-18rem', // WHEEL_SIZE / 2  -> 바깥쪽 휠이 어느정도 나올지 조정
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'grab',
  userSelect: 'none',
  touchAction: 'none',
  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  selectors: {
    '&:active': {
      cursor: 'grabbing',
    },
  },
});

export const wheelDragging = style({
  transition: 'none',
});

export const wheelItem = recipe({
  base: {
    position: 'absolute',
    left: '50%',
    top: '48%', // 글자의 휠 중심
    transformOrigin: '0 50%',
    transition: 'opacity 0.2s ease, color 0.2s ease',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
  },
  variants: {
    active: {
      true: {
        color: vars.color.text.brand,
      },
      false: {
        color: vars.color.text.primary,
        opacity: 0.4,
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const centerCircle = style({
  position: 'absolute',
  width: CENTER_CIRCLE_SIZE,
  height: CENTER_CIRCLE_SIZE,
  borderRadius: '50%',
  background: vars.color.primitive.static.white,
  left: `-${parseFloat(CENTER_CIRCLE_SIZE) / 2}rem`,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  strokeWidth: '0.8rem',
  stroke: vars.color.primitive.static.white,
  filter: 'drop-shadow(0px 0 4px rgba(0, 0, 0, 0.04))',
});
