'use client';

import React from 'react';
import * as styles from './SocialLoginButtons.css';
import { Text } from '@/shared/ui';
import { IcApple, IcKakao } from 'public/icons';

export const SocialLoginButtons = () => {
  const handleKakaoLogin = () => {
    console.log('Kakao login clicked');
  };

  const handleAppleLogin = () => {
    console.log('Apple login clicked');
  };

  return (
    <div className={styles.container}>
      <button className={styles.loginBtn({ social: 'kakao' })} onClick={handleKakaoLogin}>
        <IcKakao className={styles.loginBtnIcon} />
        <Text variant='h3'>카카오로 계속하기</Text>
      </button>
      <button className={styles.loginBtn({ social: 'apple' })} onClick={handleAppleLogin}>
        <IcApple className={styles.loginBtnIcon} />
        <Text variant='h3'>Apple로 계속하기</Text>
      </button>
    </div>
  );
};
