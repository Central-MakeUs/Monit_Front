'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { useKakaoCode } from '@/features/auth/model/useKakaoCode';
import { usePlatform } from '@/shared/lib/bridge';
import { Spinner } from '@/shared/ui/spinner';

export default function KakaoCallbackPage() {
  const { isSuccess, error, invalidAccess } = useKakaoCode();
  const [platformReady, setPlatformReady] = useState(false);

  const router = useRouter();
  const platform = usePlatform();

  useEffect(() => {
    setPlatformReady(true);
  }, [platform]);

  useEffect(() => {
    if (isSuccess && platformReady) {
      if (platform === 'ios') {
        router.push('/agreement');
      } else {
        router.push('/');
      }
    }
  }, [isSuccess, platform, platformReady, router]);

  if (invalidAccess) {
    notFound();
  }

  if (error) {
    notFound();
  }

  return <Spinner message='로그인 처리 중...' />;
}
