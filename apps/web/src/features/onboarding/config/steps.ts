/**
 * 온보딩 스텝별 식별자 키 타입
 */
export type StepKey = 'plus-btn' | 'banner' | 'nav-toggle';

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
  /** 현재 스텝 순서 표시 (예: (1/3)) */
  stepOrder: string;
  /** 툴팁이 보여질 방향 */
  direction: 'top' | 'bottom';
  /** 화살표의 위치 */
  arrow: 'left' | 'center' | 'right';
  /** 툴팁의 추가 오프셋 좌표 */
  tooltipOffset?: { x?: string; y?: string };
}

/**
 * 온보딩 투어의 전체 단계 설정
 */
export const STEPS: OnboardingStep[] = [
  {
    key: 'plus-btn',
    title: '소비기록',
    stepOrder: '(1/3)',
    desc: '플러스 버튼을 눌러, 소비를 기록해 보세요',
    direction: 'bottom',
    arrow: 'right',
    tooltipOffset: { x: '5.8rem', y: '-0.5rem' },
  },
  {
    key: 'banner',
    title: '소비 돌아보기',
    stepOrder: '(2/3)',
    desc: '소비를 돌아보며 나의 만족도를 기록할 수 있어요',
    direction: 'top',
    arrow: 'right',
    tooltipOffset: { x: '18.8rem', y: '0rem' },
  },
  {
    key: 'nav-toggle',
    title: '소비 분석 리포트',
    stepOrder: '(3/3)',
    desc: '내 소비 만족도를 리포트로 한눈에 볼 수 있어요',
    direction: 'bottom',
    arrow: 'center',
    tooltipOffset: { x: '7.6rem', y: '0rem' },
  },
];
