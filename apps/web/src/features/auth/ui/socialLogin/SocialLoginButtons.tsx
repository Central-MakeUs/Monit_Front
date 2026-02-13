'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as styles from './SocialLoginButtons.css';
import { Text, useToast } from '@/shared/ui';
import { IcApple, IcKakao } from 'public/icons';
import { useKakaoLogin } from '@/features/auth/model';
import { usePlatform, useBridge } from '@/shared/lib/bridge';
import { useAuthStore } from '@/shared/stores/authStore';

/**
 * 소셜 로그인 버튼 컴포넌트
 * - 네이티브: bridge.socialLogin()이 모든 처리 완료 (카카오 로그인 + 백엔드 API + 토큰 저장)
 * - 웹: 기존 Kakao SDK 사용
 */
export const SocialLoginButtons = () => {
  const [isNativeLoginLoading, setIsNativeLoginLoading] = useState(false);
  const platform = usePlatform();
  const router = useRouter();
  const toast = useToast();
  const bridge = useBridge();
  const setAuth = useAuthStore((state) => state.setAuth);

  const { handleKakaoLogin } = useKakaoLogin({
    onSuccess: async () => {
      // 네이티브에서 모든 처리 완료 → 토큰 로드 후 홈으로 이동

      // 네이티브에 저장된 토큰을 웹 스토어에 동기화
      if ((platform === 'ios' || platform === 'android') && bridge) {
        try {
          const { accessToken } = await bridge.getAccessToken();
          if (accessToken) {
            setAuth({
              accessToken,
              // TODO: RefreshToken 사용 시 주석 해제
              // refreshToken: refreshToken || '',
            });
          }
        } catch {
          // 토큰 로드 실패
        }
      }

      setIsNativeLoginLoading(false);
      toast.success('로그인에 성공했어요');
      router.replace('/');
    },
    onError: () => {
      setIsNativeLoginLoading(false);
      toast.attention('카카오 로그인에 실패했어요.');
    },
  });

  const handleKakaoLoginClick = () => {
    setIsNativeLoginLoading(true);
    handleKakaoLogin();
  };

  const handleAppleLogin = async () => {
    console.log('SocialLoginButtons');
    try {
      if (!bridge?.socialLogin('apple')) {
        alert('브릿지 함수가 사용 불가능합니다.');
        throw new Error('브릿지 함수가 사용 불가능합니다');
      }

      const result = await bridge.socialLogin('apple');

      console.log(result);
      if (result.success && result.data?.accessToken) {
        useAuthStore.getState().setAccessToken(result.data?.accessToken);
      } else {
        alert(`Apple 로그인에 실패하였습니다: ${result.message || '알 수 없는 오류'}`);
      }
    } catch {
      alert(`Apple 로그인에 실패하였습니다.`);
    }
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
        <Text variant='h3'>{isLoading ? '로딩 중...' : '카카오로 계속하기'}</Text>
      </button>
      {platform === 'ios' && (
        <button className={styles.loginBtn({ social: 'apple' })} onClick={handleAppleLogin}>
          <span className={styles.iconWrapper({ social: 'apple' })}>
            <IcApple />
          </span>
          <Text variant='h3'>{'Apple로 계속하기'}</Text>
        </button>
      )}
    </div>
  );
};
