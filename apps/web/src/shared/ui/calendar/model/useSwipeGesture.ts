'use client';

import { useRef } from 'react';

interface UseSwipeGestureOptions {
  /** 왼쪽으로 스와이프 시 호출될 콜백 (다음 항목으로 이동) */
  onSwipeLeft?: () => void;
  /** 오른쪽으로 스와이프 시 호출될 콜백 (이전 항목으로 이동) */
  onSwipeRight?: () => void;
  /** 스와이프로 인식할 최소 거리 (px). 기본값: 50px */
  threshold?: number;
}

/**
 * 터치 스와이프 제스처를 감지하는 커스텀 훅
 *
 * @description
 * 좌우 스와이프 제스처를 감지하여 콜백을 실행합니다.
 * threshold 값 이상으로 드래그해야 스와이프로 인식됩니다.
 *
 * @example
 * ```tsx
 * const { handleTouchStart, handleTouchEnd } = useSwipeGesture({
 *   onSwipeLeft: () => console.log('다음'),
 *   onSwipeRight: () => console.log('이전'),
 *   threshold: 80,
 * });
 *
 * return (
 *   <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
 *     스와이프 가능한 영역
 *   </div>
 * );
 * ```
 */

export const useSwipeGesture = ({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: UseSwipeGestureOptions) => {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches[0]) {
      touchEndX.current = e.changedTouches[0].clientX;
      handleSwipe();
    }
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;

    // threshold 이상의 거리를 이동한 경우에만 스와이프로 인식
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // 왼쪽으로 스와이프 (시작점이 더 오른쪽)
        onSwipeLeft?.();
      } else {
        // 오른쪽으로 스와이프 (시작점이 더 왼쪽)
        onSwipeRight?.();
      }
    }
  };

  return {
    /** 터치 시작 이벤트 핸들러. onTouchStart에 연결 */
    handleTouchStart,
    /** 터치 종료 이벤트 핸들러. onTouchEnd에 연결 */
    handleTouchEnd,
  };
};
