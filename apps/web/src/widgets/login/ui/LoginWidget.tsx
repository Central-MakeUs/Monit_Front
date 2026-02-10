'use client';

import React, { useState } from 'react';
import * as styles from './LoginWidget.css';
import { OnboardingSlider } from '@/widgets/onboarding';
import { SocialLoginButtons } from '@/features/auth/ui';

export const LoginWidget = () => {
  const [showLoginButtons, setShowLoginButtons] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.sliderWrapper}>
        <OnboardingSlider onLastSlide={() => setShowLoginButtons(true)} />
      </div>

      {showLoginButtons && (
        <div className={styles.buttonWrapper}>
          <SocialLoginButtons />
        </div>
      )}
    </div>
  );
};
