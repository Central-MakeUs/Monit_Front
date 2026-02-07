import { useLayoutEffect, useState } from 'react';

/**
 * 온보딩 대상 요소를 실시간으로 추적하고 위치 정보를 제공하는 훅
 *
 * @param isActive - 현재 온보딩 모드가 활성화되어 있는지 여부
 * @param targetKey - 추적할 대상 요소의 `data-onboarding-id` 값
 * @returns { (DOMRect & { borderRadius?: string }) | null } 대상 요소의 위치 및 스타일 정보
 *
 * @description
 * 1. 대상 요소가 DOM에 나타날 때까지 폴링을 수행합니다.
 * 2. 요소가 감지되면 해당 요소의 위치(Rect)와 borderRadius를 측정합니다.
 * 3. 윈도우 리사이즈 및 스크롤 시 위치 정보를 최신화합니다.
 * 4. 요소의 위치에 맞춰 부드럽게 스크롤을 이동시킵니다.
 */
export function useOnboardingElement(isActive: boolean, targetKey: string | undefined) {
  const [rect, setRect] = useState<(DOMRect & { borderRadius?: string }) | null>(null);

  useLayoutEffect(() => {
    // 타겟이 변경되면 기존 rect 초기화
    setRect(null);

    if (!isActive || !targetKey) return;

    let cleanup = () => {};

    const checkElement = () => {
      const selector = `[data-onboarding-id="${targetKey}"]`;
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
  }, [isActive, targetKey]);

  return rect;
}
