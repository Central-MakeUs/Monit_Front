// TODO: 디자인 시스템에 따라 z-index 토큰 정리
// 현재는 임시용
export const zIndex = {
  /** 토스트 (가장 낮음) */
  toast: 1000,
  /** 오버레이 (중간) */
  overlay: 2000,
  /** 모달 (가장 높음) */
  modal: 3000,
} as const;

export type ZIndex = typeof zIndex;
