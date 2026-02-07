'use client';

import React, { useState, useRef } from 'react';
import * as styles from './OnboardingSlider.css';
import { PageIndicator, Text, vars } from '@/shared/ui';
import Image from 'next/image';

const SLIDES = [
  {
    label: '소비 기록',
    title: '소비와 그때의 마음을\n함께 기록해요',
    image: '/images/onboarding_1.png',
  },
  {
    label: '소비 돌아보기',
    title: '다음날 소비를 돌아보며\n만족도를 선택해요',
    image: '/images/onboarding_2.png',
  },
  {
    label: '소비 리포트',
    title: '기록을 정리해\n리포트로 보여드려요',
    image: '/images/onboarding_3.png',
  },
];

const SWIPE_THRESHOLD = 50;

interface OnboardingSliderProps {
  onLastSlide?: () => void;
}

export type { OnboardingSliderProps };

export const OnboardingSlider = ({ onLastSlide }: OnboardingSliderProps) => {
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
      if (diff > 0 && currentPage < SLIDES.length - 1) {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        if (newPage === SLIDES.length - 1) {
          onLastSlide?.();
        }
      } else if (diff < 0 && currentPage > 0) {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.slideContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateX(-${currentPage * 100}%)` }}>
        {SLIDES.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <div className={styles.textWrapper}>
              <Text variant='h3' color={vars.color.text.secondary}>
                {slide.label}
              </Text>
              <Text variant='t5' color={vars.color.text.primary}>
                {slide.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < slide.title.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </Text>
            </div>
            <Image
              src={slide.image}
              alt={slide.label}
              width={353}
              height={420}
              className={styles.onboardingImage}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className={styles.indicatorWrapper}>
        <PageIndicator currentPage={currentPage} totalPages={SLIDES.length} />
      </div>
    </div>
  );
};
