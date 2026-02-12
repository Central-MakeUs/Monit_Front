import { style, keyframes } from '@vanilla-extract/css';

/**
 * 로딩 중 깜빡이는 애니메이션
 * @description 데이터 페칭 중임을 시각적으로 표현하는 애니메이션
 * 추후 디자인 요청 후 수정 필요
 */
const blink = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});

export const blinkingText = style({
  animation: `${blink} 1.5s ease-in-out infinite`,
});
