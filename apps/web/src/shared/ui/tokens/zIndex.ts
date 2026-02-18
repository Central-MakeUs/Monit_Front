// TODO: 디자인 시스템에 따라 z-index 토큰 정리
// 현재는 임시용
export const zIndex = {
  /** 토스트 (가장 높음) */
  toast: 3000,
  /** 모달 (높음) */
  modal: 2000,
  /** 오버레이 (중간) */
  overlay: 1000,
} as const;

export type ZIndex = typeof zIndex;
