import React, { useState, useRef } from 'react';

const SWIPE_THRESHOLD = 50;

interface UseOnboardingSliderProps {
  totalSlides: number;
  onLastSlide?: () => void;
  onPageChange?: (isLastSlide: boolean) => void;
}

export const useOnboardingSlider = ({
  totalSlides,
  onLastSlide,
  onPageChange,
}: UseOnboardingSliderProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0 && currentPage < totalSlides - 1) {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        const isLast = newPage === totalSlides - 1;
        if (isLast) onLastSlide?.();
        onPageChange?.(isLast);
      } else if (diff < 0 && currentPage > 0) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        onPageChange?.(newPage === totalSlides - 1);
      }
    }
  };

  return { currentPage, handleTouchStart, handleTouchMove, handleTouchEnd };
};
