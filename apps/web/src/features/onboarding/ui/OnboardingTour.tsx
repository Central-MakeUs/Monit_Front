'use client';

import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOnboardingStore } from '../model/onboardingStore';
import { Tooltip } from '@/shared/ui/tooltip';
import * as styles from './OnboardingTour.css';

type StepKey = 'plus-btn' | 'banner' | 'nav-toggle';

const STEPS: {
  key: StepKey;
  title: string;
  desc: string;
  stepOrder: string;
  direction: 'top' | 'bottom';
  arrow: 'left' | 'center' | 'right';
  tooltipOffset?: { x?: string; y?: string };
}[] = [
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

export function OnboardingTour(): React.JSX.Element | null {
  const { flow, step, nextStep, endTour } = useOnboardingStore();
  const [rect, setRect] = useState<(DOMRect & { borderRadius?: string }) | null>(null);

  const current = STEPS[step];

  useLayoutEffect(() => {
    if (flow !== 'tour' || !current) return;

    let cleanup = () => {};
    // 요소를 찾기 위한 폴링 함수
    const checkElement = () => {
      const selector = `[data-onboarding-id="${current.key}"]`;
      const el = document.querySelector(selector) as HTMLElement | null;

      if (el) {
        const update = () => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          setRect({
            ...rect.toJSON(),
            borderRadius: style.borderRadius,
          });
        };
        update();

        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true);
        el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });

        cleanup = () => {
          window.removeEventListener('resize', update);
          window.removeEventListener('scroll', update, true);
        };
        return true;
      }
      return false;
    };

    // 즉시 폴링 시작 및 2초 동안 100ms 간격으로 실행
    if (!checkElement()) {
      const pollTimer = setInterval(() => {
        if (checkElement()) {
          clearInterval(pollTimer);
        }
      }, 100);

      const timeoutId = setTimeout(() => clearInterval(pollTimer), 2000);

      return () => {
        clearInterval(pollTimer);
        clearTimeout(timeoutId);
        cleanup();
      };
    }

    return () => {
      cleanup();
    };
  }, [flow, step, current]);

  if (flow !== 'tour' || !current) return null;

  // 화살표 위치에 기반한 왼쪽 좌표 계산
  const getTooltipLeft = (rect: DOMRect) => {
    const tooltipWidth = 280; // 이전 하드코딩된 오프셋을 기반으로 한 대략적인 너비
    const arrowOffset = 30; // 화살표 컨테이너 너비의 절반 (60px/2)

    const targetCenter = rect.left + rect.width / 2;
    let baseLeft = targetCenter;

    if (current.arrow === 'center') {
      baseLeft -= tooltipWidth / 2;
    } else if (current.arrow === 'right') {
      baseLeft -= tooltipWidth - arrowOffset;
    } else if (current.arrow === 'left') {
      baseLeft -= arrowOffset;
    }

    const offsetX = current.tooltipOffset?.x || '0px';
    return `calc(${baseLeft}px + ${offsetX})`;
  };

  const getTooltipTop = (rect: DOMRect) => {
    const baseTop = current.direction === 'bottom' ? rect.top - 12 : rect.bottom + 12;
    const offsetY = current.tooltipOffset?.y || '0px';
    return `calc(${baseTop}px + ${offsetY})`;
  };

  return createPortal(
    <div>
      {/* 오버레이: 투명 클릭 수신부 */}
      <div
        className={styles.overlay}
        onClick={() => {
          if (step === STEPS.length - 1) endTour();
          else nextStep();
        }}
      />

      {/* 컷아웃 효과가 적용된 하이라이트 박스 */}
      {rect && (
        <>
          <div
            key={current.key} // 페이드 인 애니메이션 트리거를 위한 강제 재렌더링
            className={styles.highlightBox({
              glow: current.key !== 'banner',
            })}
            style={{
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
              borderRadius: rect.borderRadius || '12px',
            }}
          />

          {/* 위치가 지정된 공용 툴팁 컴포넌트 */}
          <div
            key={`${current.key}-tooltip`} // 페이드 인 애니메이션 트리거를 위한 강제 재렌더링
            className={styles.tooltipPositioner}
            style={{
              left: getTooltipLeft(rect),
              top: getTooltipTop(rect),
              transform: current.direction === 'bottom' ? 'translateY(-100%)' : 'none',
            }}>
            <Tooltip
              title={current.title}
              step={current.stepOrder}
              description={current.desc}
              direction={current.direction}
              arrow={current.arrow}
            />
          </div>
        </>
      )}
    </div>,
    document.body
  );
}
