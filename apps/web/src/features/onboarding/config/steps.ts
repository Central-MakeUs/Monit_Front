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

/**
 * 카테고리 관리 페이지 온보딩 투어 단계 설정
 */
export const CATEGORY_STEPS: OnboardingStep[] = [
  {
    key: 'category-first-item',
    title: '카테고리 수정하기',
    stepOrder: '(1/2)',
    desc: '카테고리를 선택하면 이름과 아이콘을 바꿀 수 있어요',
    direction: 'top',
    arrow: 'left',
    tooltipOffset: { y: '2.1rem' },
  },
  {
    key: 'category-add-btn',
    title: '카테고리 추가하기',
    stepOrder: '(2/2)',
    desc: '새로운 카테고리를 추가할 수 있어요',
    direction: 'right',
    arrow: 'top',
    tooltipOffset: { x: '-22rem', y: '-3.5rem' },
    highlightDisabled: true,
  },
];

/**
 * 리뷰(돌아보기) 페이지 온보딩 투어 단계 설정
 */
export const REMIND_STEPS: OnboardingStep[] = [
  {
    key: 'satisfaction-rating',
    title: '만족도 선택하기',
    desc: '지금 기준으로 가장 가까운 만족도를 골라주세요',
    direction: 'top',
    arrow: 'left',
    highlightPadding: 20,
    highlightBorderRadius: '20px',
    tooltipOffset: { x: '-12.5rem' },
  },
];
