import { OnboardingStep } from '../config/steps';

/**
 * 툴팁의 최종 위치 및 스타일 정보를 담는 인터페이스
 */
interface TooltipPosition {
  /** 브라우저 좌상단 기준 left 좌표 (단위 포함) */
  left: string;
  /** 브라우저 좌상단 기준 top 좌표 (단위 포함) */
  top: string;
  /** 방향에 따른 transform 속성 */
  transform: string;
}

/**
 * 대상 요소의 Rect와 스텝 설정을 바탕으로 툴팁이 위치할 좌표를 계산하는 순수 함수
 *
 * @param rect - 하이라이트할 대상 요소의 DOMRect
 * @param step - 현재 온보딩 단계의 설정 정보
 * @returns {TooltipPosition} 계산된 위치 정보를 담은 객체
 */
export function calcTooltipPosition(rect: DOMRect, step: OnboardingStep): TooltipPosition {
  const tooltipWidth = 280; // 이전 하드코딩된 오프셋을 기반으로 한 대략적인 너비
  const arrowOffset = 30; // 화살표 컨테이너 너비의 절반 (60px/2)

  // Calculate Left
  const targetCenter = rect.left + rect.width / 2;
  let baseLeft = targetCenter;

  if (step.arrow === 'center') {
    baseLeft -= tooltipWidth / 2;
  } else if (step.arrow === 'right') {
    baseLeft -= tooltipWidth - arrowOffset;
  } else if (step.arrow === 'left') {
    baseLeft -= arrowOffset;
  }

  const offsetX = step.tooltipOffset?.x || '0px';
  const left = `calc(${baseLeft}px + ${offsetX})`;

  // Calculate Top
  const baseTop = step.direction === 'bottom' ? rect.top - 12 : rect.bottom + 12;
  const offsetY = step.tooltipOffset?.y || '0px';
  const top = `calc(${baseTop}px + ${offsetY})`;

  // Transform
  const transform = step.direction === 'bottom' ? 'translateY(-100%)' : 'none';

  return { left, top, transform };
}
