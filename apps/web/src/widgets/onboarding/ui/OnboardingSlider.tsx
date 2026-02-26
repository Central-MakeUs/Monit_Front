'use client';

import React from 'react';
import * as styles from './OnboardingSlider.css';
import { PageIndicator, Text, vars } from '@/shared/ui';
import { Onboarding1, Onboarding2, Onboarding3 } from 'public/images';
import { FC, SVGProps } from 'react';
import { useOnboardingSlider } from '../model/useOnboardingSlider';

const SLIDES: { label: string; title: string; Image: FC<SVGProps<SVGElement>> }[] = [
  {
    label: '소비 기록',
    title: '소비와 그때의 마음을\n함께 기록해요',
    Image: Onboarding1,
  },
  {
    label: '소비 돌아보기',
    title: '다음날 소비를 돌아보며\n만족도를 선택해요',
    Image: Onboarding2,
  },
  {
    label: '소비 리포트',
    title: '기록을 정리해\n리포트로 보여드려요',
    Image: Onboarding3,
  },
];

interface OnboardingSliderProps {
  onLastSlide?: () => void;
  onPageChange?: (isLastSlide: boolean) => void;
}

export type { OnboardingSliderProps };

export const OnboardingSlider = ({ onLastSlide, onPageChange }: OnboardingSliderProps) => {
  const { currentPage, handleTouchStart, handleTouchMove, handleTouchEnd } = useOnboardingSlider({
    totalSlides: SLIDES.length,
    onLastSlide,
    onPageChange,
  });

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
            <slide.Image />
          </div>
        ))}
      </div>

      <div className={styles.indicatorWrapper}>
        <PageIndicator currentPage={currentPage} totalPages={SLIDES.length} />
      </div>
    </div>
  );
};
