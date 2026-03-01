import { OnboardingStep } from './steps.types';

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
