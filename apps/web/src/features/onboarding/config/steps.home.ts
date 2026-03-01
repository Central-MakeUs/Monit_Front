import { OnboardingStep } from './steps.types';

/**
 * 홈 온보딩 투어의 단계 설정
 */
export const HOME_STEPS: OnboardingStep[] = [
  {
    key: 'plus-btn',
    title: '소비기록',
    stepOrder: '(1/2)',
    desc: '플러스 버튼을 눌러, 소비를 기록해 보세요',
    direction: 'bottom',
    arrow: 'right',
    tooltipOffset: { x: '5.8rem', y: '-0.5rem' },
  },
  {
    key: 'banner',
    title: '소비 돌아보기',
    stepOrder: '(2/2)',
    desc: '소비를 돌아보며 나의 만족도를 기록할 수 있어요',
    direction: 'top',
    arrow: 'right',
    tooltipOffset: { x: '18.8rem', y: '0rem' },
  },
  // {
  //   key: 'nav-toggle',
  //   title: '소비 분석 리포트',
  //   stepOrder: '(3/3)',
  //   desc: '내 소비 만족도를 리포트로 한눈에 볼 수 있어요',
  //   direction: 'bottom',
  //   arrow: 'center',
  //   tooltipOffset: { x: '7.6rem', y: '0rem' },
  // },
];
