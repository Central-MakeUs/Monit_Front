'use client';

import React from 'react';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getKakaoCallback } from '@/features/auth/api/getKakaoCallback';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        console.error('Kakao login error:', error);
        alert('카카오 로그인에 실패했습니다.');
        router.push('/login');
        return;
      }

      if (!code) {
        console.error('No code received from Kakao');
        router.push('/login');
        return;
      }

      try {
        const response = await getKakaoCallback(code);

        if (response.isSuccess) {
          // 로그인 성공 - 홈으로 이동
          router.push('/');
        } else {
          throw new Error(response.message || '로그인에 실패했습니다.');
        }
      } catch (error) {
        console.error('Kakao callback error:', error);
        alert('로그인 처리 중 오류가 발생했습니다.');
        router.push('/login');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
      <p>로그인 처리 중...</p>
    </div>
  );
}
