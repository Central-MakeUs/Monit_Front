'use client';

import React from 'react';
import * as styles from './LoginWidget.css';
import { IcAppLogo, IcBigGrayLogo } from 'public/icons';
import { SocialLoginButtons } from '@/features/auth';

export const LoginWidget = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gradationOverlay} />
      <div className={styles.topSection}>
        <IcAppLogo />
        <div className={styles.textWrapper}>
          <p className={styles.normalText}>
            나의 감정과 지출 사이,
            <br />
            가장 <span className={styles.boldText}>나다운 소비</span>의 균형
          </p>
        </div>
      </div>
      <IcBigGrayLogo className={styles.bigGrayLogo} />
      <div className={styles.buttonWrapper}>
        <SocialLoginButtons />
      </div>
    </div>
  );
};
