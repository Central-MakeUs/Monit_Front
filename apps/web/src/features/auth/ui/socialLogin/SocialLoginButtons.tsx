'use client';

import React from 'react';
import * as styles from './SocialLoginButtons.css';
import { Text } from '@/shared/ui';
import { IcApple, IcKakao } from 'public/icons';
import { useKakaoLogin, useKakaoSDK } from '@/features/auth/model';
import { usePlatform } from '@/shared/lib/bridge';

export const SocialLoginButtons = () => {
  const { isLoaded, isLoading: isKakaoLoading } = useKakaoSDK();
  const { handleKakaoLogin } = useKakaoLogin();
  // const { handleAppleLogin, isLoading: isAppleLoading } = useAppleLogin();
  const platform = usePlatform();

  const handleKakaoLoginClick = () => {
    if (!isLoaded) {
      return;
    }
    handleKakaoLogin();
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.loginBtn({ social: 'kakao' })}
        onClick={handleKakaoLoginClick}
        disabled={isKakaoLoading}>
        <span className={styles.iconWrapper({ social: 'kakao' })}>
          <IcKakao />
        </span>
        <Text variant='h3'>{isKakaoLoading ? '로딩 중...' : '카카오로 계속하기'}</Text>
      </button>
      {platform === 'ios' && (
        <button className={styles.loginBtn({ social: 'apple' })} onClick={() => {}}>
          <span className={styles.iconWrapper({ social: 'apple' })}>
            <IcApple />
          </span>
          <Text variant='h3'>{'Apple로 계속하기'}</Text>
        </button>
      )}
    </div>
  );
};
