'use client';

import React, { useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { useKakaoCode } from '@/features/auth/model/useKakaoCode';
import { usePlatform } from '@/shared/lib/bridge';
import { Spinner } from '@/shared/ui/spinner';

export default function KakaoCallbackPage() {
  const { isSuccess, error, invalidAccess } = useKakaoCode();
  const router = useRouter();
  const platform = usePlatform();

  useEffect(() => {
    if (isSuccess) {
      if (platform === 'ios') {
        router.push('/agreement');
      } else {
        router.push('/');
      }
    }
  }, [isSuccess, platform, router]);

  if (error && invalidAccess) {
    notFound();
  }

  return <Spinner message='로그인 처리 중...' />;
}
