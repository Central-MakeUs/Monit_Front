'use client';

import React from 'react';
import * as styles from './SocialLoginButtons.css';
import { Text } from '@/shared/ui';
import { IcApple, IcKakao } from 'public/icons';
import { useKakaoLogin, useKakaoSDK } from '@/features/auth/model';
import { usePlatform } from '@/shared/lib/bridge';

export const SocialLoginButtons = () => {
  const { isLoaded, isLoading } = useKakaoSDK();
  const { handleKakaoLogin } = useKakaoLogin();
  const platform = usePlatform();

  const handleAppleLogin = () => {
    // TODO: 애플 로그인 구현
    console.log('Apple login clicked');
  };

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
        disabled={isLoading}>
        <IcKakao />
        <Text variant='h3'>{isLoading ? '로딩 중...' : '카카오로 계속하기'}</Text>
      </button>
      {platform === 'ios' && (
        <button className={styles.loginBtn({ social: 'apple' })} onClick={handleAppleLogin}>
          <IcApple />
          <Text variant='h3'>Apple로 계속하기</Text>
        </button>
      )}
    </div>
  );
};
