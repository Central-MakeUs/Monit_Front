'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as styles from './SocialLoginButtons.css';
import { Text, useToast } from '@/shared/ui';
import { IcApple, IcKakao } from 'public/icons';
import { useKakaoLogin, useAppleLogin } from '@/features/auth/model';
import { useBridge } from '@/shared/lib/bridge';
import { useAuthStore } from '@/shared/stores/authStore';
import { getPlatform } from '@/shared/utils';
import { ROUTES } from '@/shared/constants';
import { useOnboardingStore } from '@/features/onboarding';

/**
 * 소셜 로그인 버튼 컴포넌트
 * - 네이티브: bridge.socialLogin()이 모든 처리 완료 (카카오 로그인 + 백엔드 API + 토큰 저장)
 * - 웹: 기존 Kakao SDK 사용
 */
export const SocialLoginButtons = () => {
  const [isNativeLoginLoading, setIsNativeLoginLoading] = useState(false);
  const { hydrateFromServer } = useOnboardingStore();
  const platform = getPlatform();
  const router = useRouter();
  const toast = useToast();
  const bridge = useBridge();
  const setAuth = useAuthStore((state) => state.setAuth);

  const syncNativeToken = async () => {
    if ((platform === 'ios' || platform === 'android') && bridge) {
      try {
        const { accessToken } = await bridge.getAccessToken();
        if (accessToken) {
          setAuth({ accessToken });
        }
      } catch {
        // 토큰 로드 실패
      }
    }
  };

  const { handleKakaoLogin } = useKakaoLogin({
    onSuccess: async () => {
      await syncNativeToken();
      setIsNativeLoginLoading(false);
      toast.success('로그인에 성공했어요');
      router.replace('/');
    },
    onError: () => {
      setIsNativeLoginLoading(false);
      toast.attention('카카오 로그인에 실패했어요.');
    },
  });

  const { handleAppleLogin } = useAppleLogin({
    onSuccess: async (data) => {
      await syncNativeToken();
      setIsNativeLoginLoading(false);
      toast.success('로그인에 성공했어요');
      // 지출이 있으면 온보딩 X
      if (data?.hasExpense) {
        hydrateFromServer(true);
      }
      if (data?.termsAgreed) {
        router.replace(ROUTES.HOME);
      } else {
        router.replace(ROUTES.AGREEMENT);
      }
    },
    onError: () => {
      setIsNativeLoginLoading(false);
      toast.attention('Apple 로그인에 실패했어요.');
    },
  });

  const handleKakaoLoginClick = () => {
    setIsNativeLoginLoading(true);
    handleKakaoLogin();
  };

  const handleAppleLoginClick = () => {
    setIsNativeLoginLoading(true);
    handleAppleLogin();
  };

  const isLoading = isNativeLoginLoading;

  return (
    <div className={styles.container}>
      <button
        className={styles.loginBtn({ social: 'kakao' })}
        onClick={handleKakaoLoginClick}
        disabled={isLoading}>
        <span className={styles.iconWrapper({ social: 'kakao' })}>
          <IcKakao />
        </span>
        <Text variant='h3'>{'카카오로 계속하기'}</Text>
      </button>
      {platform === 'ios' && (
        <button
          className={styles.loginBtn({ social: 'apple' })}
          onClick={handleAppleLoginClick}
          disabled={isLoading}>
          <span className={styles.iconWrapper({ social: 'apple' })}>
            <IcApple />
          </span>
          <Text variant='h3'>{'Apple로 계속하기'}</Text>
        </button>
      )}
    </div>
  );
};
