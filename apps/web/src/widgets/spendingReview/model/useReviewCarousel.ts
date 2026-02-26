'use client';

import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';

// 카드가 넘어가는 데 필요한 최소 드래그 거리 비율 (화면의 1%만 드래그해도 전환)
const SWIPE_THRESHOLD_RATIO = 0.01;

interface UseReviewCarouselProps {
  totalItems: number;
}

export interface UseReviewCarouselReturn {
  currentIndex: number;
  dragOffset: number;
  isDragging: boolean;
  isTransitioning: boolean;
  trackRef: React.RefObject<HTMLDivElement | null>;
  handlers: ReturnType<typeof useSwipeable>;
  handleTransitionEnd: () => void;
  getTransform: () => string;
  getTransition: () => string;
}

/**
 * 회고 카드 스와이프 캐러셀 훅
 *
 * 구조: [prev 슬라이드] [current 슬라이드] [next 슬라이드]
 * - 3장의 슬라이드를 나란히 배치하고, translateX로 현재 카드를 보여줌
 * - 스와이프하면 translateX를 이동시켜 다음/이전 카드로 전환
 *
 * 동작 흐름:
 * 1. 터치 시작 → onSwiping: 드래그 거리만큼 offset 반영 (러버밴드 저항 적용)
 * 2. 터치 끝 → onSwiped: threshold 넘으면 카드 전환, 아니면 바운스백
 * 3. 전환 애니메이션 종료 → handleTransitionEnd: 실제 index 업데이트
 */
export const useReviewCarousel = ({
  totalItems,
}: UseReviewCarouselProps): UseReviewCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 보이는 카드 인덱스
  const [dragOffset, setDragOffset] = useState(0); // 드래그 중 이동 거리 (px)
  const [isDragging, setIsDragging] = useState(false); // 드래그 중 여부
  const [isTransitioning, setIsTransitioning] = useState(false); // CSS 전환 애니메이션 중 여부
  const [slideWidth, setSlideWidth] = useState(0); // 슬라이드 1장의 너비 (px)

  const trackRef = useRef<HTMLDivElement>(null); // 슬라이드 트랙 DOM
  const pendingActionRef = useRef<'left' | 'right' | null>(null); // 전환 방향
  const isBouncingBackRef = useRef(false); // 경계 바운스백 진행 중 여부

  // ─── 슬라이드 너비 측정 (마운트 + 리사이즈) ───
  useLayoutEffect(() => {
    const updateWidth = () => {
      const container = trackRef.current?.parentElement;
      if (!container) return;
      const { paddingLeft, paddingRight } = window.getComputedStyle(container);
      setSlideWidth(container.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight));
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // ─── 파생 값 ───
  const swipeThreshold = slideWidth * SWIPE_THRESHOLD_RATIO;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalItems - 1;

  /**
   * CSS transition 종료 시 호출
   * - 바운스백이면 플래그만 해제
   * - 카드 전환이면 실제 index를 업데이트하고 offset 초기화
   *   (애니메이션이 끝난 뒤 index를 바꿔야 슬라이드가 점프하지 않음)
   */
  const handleTransitionEnd = useCallback(() => {
    // 바운스백 완료
    if (isBouncingBackRef.current) {
      isBouncingBackRef.current = false;
      return;
    }

    // 카드 전환 완료
    if (pendingActionRef.current && isTransitioning) {
      setIsTransitioning(false);

      if (pendingActionRef.current === 'left') {
        setCurrentIndex((prev) => Math.min(prev + 1, totalItems - 1));
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }

      setDragOffset(0);
      pendingActionRef.current = null;
    }
  }, [isTransitioning, totalItems]);

  // ─── 스와이프 핸들러 (react-swipeable) ───
  const handlers = useSwipeable({
    /**
     * 드래그 중 매 프레임 호출
     * - iOS 스타일 러버밴드 공식: offset = width * (1 - 1 / (delta * r / width + 1))
     *   → 드래그할수록 이동량이 점점 줄어드는 감속 곡선
     * - resistance: 일반 스와이프 0.55 / 경계(첫번째↔마지막) 0.3 (더 강한 저항)
     */
    onSwiping: (eventData) => {
      if (isTransitioning || slideWidth === 0) return;

      setIsDragging(true);
      const delta = eventData.deltaX;

      const absDelta = Math.abs(delta);
      const isBoundary = (isFirst && delta > 0) || (isLast && delta < 0);
      const resistance = isBoundary ? 0.3 : 0.55;
      let clampedOffset =
        Math.sign(delta) * slideWidth * (1 - 1 / ((absDelta * resistance) / slideWidth + 1));
      clampedOffset = Math.max(-slideWidth, Math.min(slideWidth, clampedOffset));
      setDragOffset(clampedOffset);
    },

    /**
     * 터치 끝났을 때 호출
     * - threshold 이상 드래그 → 다음/이전 카드로 전환 (슬라이드 끝까지 애니메이션)
     * - threshold 미만 또는 경계 → 바운스백 (원위치로 복귀)
     *   rAF로 1프레임 뒤에 offset=0 설정해야 CSS transition이 적용됨
     */
    onSwiped: (eventData) => {
      const delta = eventData.deltaX;
      setIsDragging(false);

      if (delta < -swipeThreshold && !isLast) {
        // ← 왼쪽 스와이프: 다음 카드
        setIsTransitioning(true);
        pendingActionRef.current = 'left';
        setDragOffset(-slideWidth);
      } else if (delta > swipeThreshold && !isFirst) {
        // → 오른쪽 스와이프: 이전 카드
        setIsTransitioning(true);
        pendingActionRef.current = 'right';
        setDragOffset(slideWidth);
      } else {
        // 바운스백: 원위치로 부드럽게 복귀
        isBouncingBackRef.current = true;
        requestAnimationFrame(() => {
          setDragOffset(0);
        });
      }
    },
    trackMouse: false,
    trackTouch: true,
    delta: 10, // 스와이프로 인식하기 위한 최소 이동 거리 (px)
    preventScrollOnSwipe: true, // 스와이프 중 세로 스크롤 방지
  });

  // ─── CSS transform / transition 생성 ───

  /** 트랙의 translateX 값. 기본: -slideWidth (가운데 슬라이드 표시) + dragOffset */
  const getTransform = () => {
    if (slideWidth === 0) return 'translateX(-100%)';
    return `translateX(calc(-${slideWidth}px + ${dragOffset}px))`;
  };

  /** 상황별 CSS transition 반환. 드래그 중에는 'none'으로 즉각 반응 */
  const getTransition = () => {
    if (isTransitioning) return 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    if (isBouncingBackRef.current) return 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    if (!isDragging && dragOffset !== 0) return 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    return 'none';
  };

  return {
    currentIndex, // 현재 카드 인덱스
    dragOffset, // 드래그 이동량
    isDragging, // 드래그 중 여부
    isTransitioning, // 전환 애니메이션 중 여부
    trackRef, // 트랙 DOM ref (onTransitionEnd 연결용)
    handlers, // 스와이프 컨테이너에 {...handlers} 로 전달
    handleTransitionEnd, // 트랙의 onTransitionEnd에 연결
    getTransform, // 트랙의 style.transform에 사용
    getTransition, // 트랙의 style.transition에 사용
  };
};
