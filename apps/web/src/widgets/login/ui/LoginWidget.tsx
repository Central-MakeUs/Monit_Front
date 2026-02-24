'use client';

import React, { useState } from 'react';
import * as styles from './LoginWidget.css';
import { SocialLoginButtons } from '@/features/auth';
import { OnboardingSlider } from '@/widgets/onboarding';

export const LoginWidget = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handlePageChange = (isLast: boolean) => {
    if (isLast) {
      setIsExiting(false);
      setShowButtons(true);
    } else if (showButtons) {
      setIsExiting(true);
      setTimeout(() => {
        setShowButtons(false);
        setIsExiting(false);
      }, 400);
    }
  };

  return (
    <div className={styles.container}>
      <OnboardingSlider onPageChange={handlePageChange} />
      {showButtons && (
        <div className={isExiting ? styles.buttonWrapperExit : styles.buttonWrapper}>
          <SocialLoginButtons />
        </div>
      )}
    </div>
  );
};
