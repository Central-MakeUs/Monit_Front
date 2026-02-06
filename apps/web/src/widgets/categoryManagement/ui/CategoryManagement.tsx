'use client';
import React, { useState, useEffect } from 'react';
import * as styles from './CategoryManagement.css';
import { TopBar, vars, Text, CategoryBtn, Tooltip } from '@/shared/ui';
import { IcLeftChevron, IcPlusCircle } from 'public/icons';
import { useRouter } from 'next/navigation';
import { useCategoryStore } from '@/entities/category/model/store';

const ONBOARDING_KEY = 'category-management-onboarding-completed';

export const CategoryManagement = () => {
  const router = useRouter();
  const { categories } = useCategoryStore();
  const [onboardingStep, setOnboardingStep] = useState<number | null>(null);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem(ONBOARDING_KEY) === 'true';
    if (!hasSeenOnboarding) {
      setOnboardingStep(1);
    }
  }, []);

  const handleOverlayClick = () => {
    if (onboardingStep === 1) {
      setOnboardingStep(2);
    } else if (onboardingStep === 2) {
      setOnboardingStep(null);
      localStorage.setItem(ONBOARDING_KEY, 'true');
    }
  };

  return (
    <div>
      <TopBar
        left={<IcLeftChevron onClick={() => router.back()} />}
        center={
          <Text variant='t1' color={vars.color.text.primary}>
            카테고리 관리
          </Text>
        }
        right={
          <div className={onboardingStep === 2 ? styles.highlightAddButton : undefined}>
            <IcPlusCircle
              color={vars.color.icon.tertiary}
              onClick={() => router.push('/expense/category?from=mypage')}
            />
          </div>
        }
      />
      <div className={styles.categoryGrid}>
        {categories.map((category, index) => (
          <CategoryBtn
            key={category.id}
            icon={category.icon ?? 'coin'}
            label={category.name}
            type='secondary'
            highlighted={onboardingStep === 1 && index === 0}
            onClick={() => router.push(`/expense/category?mode=edit&id=${category.id}&from=mypage`)}
          />
        ))}
      </div>

      {/* 온보딩 오버레이 */}
      {onboardingStep !== null && (
        <div className={styles.onboardingOverlay} onClick={handleOverlayClick}>
          {onboardingStep === 1 && (
            <Tooltip
              className={styles.tooltipStep1}
              arrow='left'
              direction='top'
              title='카테고리 수정하기'
              step='(1/2)'
              description='카테고리의 이름과 아이콘을 수정할 수 있어요'
            />
          )}
          {onboardingStep === 2 && (
            <Tooltip
              className={styles.tooltipStep2}
              arrow='top'
              direction='right'
              title='카테고리 추가하기'
              step='(2/2)'
              description='새로운 카테고리를 추가할 수 있어요'
            />
          )}
        </div>
      )}
    </div>
  );
};
