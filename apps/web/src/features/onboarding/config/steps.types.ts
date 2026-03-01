/**
 * 온보딩 스텝별 식별자 키 타입
 */
export type StepKey =
  | 'plus-btn'
  | 'banner'
  | 'nav-toggle'
  | 'satisfaction-rating'
  | 'category-first-item'
  | 'category-add-btn';

/**
 * 온보딩 각 단계에 대한 설정 데이터 인터페이스
 */
export interface OnboardingStep {
  /** 각 스텝의 고유 키 (DOM 요소를 찾을 때 사용) */
  key: StepKey;
  /** 툴팁 제목 */
  title: string;
  /** 툴팁 설명 문구 */
  desc: string;
  /** 툴팁이 보여질 방향 */
  direction: 'top' | 'bottom' | 'left' | 'right';
  /** 화살표의 위치 */
  arrow: 'top' | 'bottom' | 'left' | 'right' | 'center';
  /** 현재 스텝 순서 표시 (예: (1/3)) */
  stepOrder?: string;
  /** 툴팁의 추가 오프셋 좌표 */
  tooltipOffset?: { x?: string; y?: string };
  /** 하이라이트 박스에 추가할 패딩 (px 단위 숫자) */
  highlightPadding?: number;
  /** 하이라이트 박스의 border-radius 오버라이드 */
  highlightBorderRadius?: string;
  /** true이면 하이라이트 박스를 렌더링하지 않음 */
  highlightDisabled?: boolean;
}
