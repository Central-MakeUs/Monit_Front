import { OnboardingStep } from './steps.types';

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
