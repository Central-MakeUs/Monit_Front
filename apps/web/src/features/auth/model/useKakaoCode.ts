'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { getKakaoCallback } from '../api/getKakaoCallback';
import { useAuthStore } from '@/shared/stores/authStore';

export const useKakaoCode = () => {
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [invalidAccess, setInvalidAccess] = useState(false);
  const isLoginCalled = useRef(false);

  useEffect(() => {
    if (isLoginCalled.current) return;

    const code = searchParams.get('code');

    if (code) {
      isLoginCalled.current = true;
      login(code);
    } else {
      setInvalidAccess(true);
    }
  }, [searchParams]);

  const login = async (code: string) => {
    try {
      const response = await getKakaoCallback(code);

      const { accessToken } = response.result;

      if (response.isSuccess && accessToken) {
        setIsSuccess(true);
        useAuthStore.getState().setAccessToken(accessToken);
      } else {
        throw new Error(response.message || '로그인에 실패했습니다.');
      }
    } catch (err) {
      setError(true);
      console.error('Login failed:', err);
    }
  };

  return { isSuccess, error, invalidAccess };
};
