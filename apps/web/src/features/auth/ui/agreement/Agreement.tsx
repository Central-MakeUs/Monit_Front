'use client';

import React, { useState } from 'react';
import * as styles from './Agreement.css';
import { Button, Text, vars, useToast } from '@/shared/ui';
import { SelectionTile } from '@/shared/ui/selectionTile/SelectionTile';
import { EXTERNAL_URLS } from '@/shared/constants/urls';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBridge, useNativeAuth } from '@/shared/lib/bridge';
import { getPlatform } from '@/shared/utils';

export const Agreement = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const registerToken = searchParams.get('registerToken') ?? '';
  const provider = searchParams.get('provider') ?? 'apple';
  const bridge = useBridge();
  const platform = getPlatform();
  const toast = useToast();
  const { syncNativeToken } = useNativeAuth();

  const [termsOfService, setTermsOfService] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const allAgreed = termsOfService && privacyPolicy;

  const toggleTermsOfService = () => setTermsOfService((prev) => !prev);
  const togglePrivacyPolicy = () => setPrivacyPolicy((prev) => !prev);

  const handleAllAgree = () => {
    const next = !allAgreed;
    setTermsOfService(next);
    setPrivacyPolicy(next);
  };

  const handleNext = async () => {
    if (!bridge || (platform !== 'ios' && platform !== 'android')) return;
    if (!registerToken) {
      toast.attention('잘못된 접근입니다. 로그인부터 다시 시도해 주세요.');
      return;
    }
    setIsPending(true);
    try {
      const result =
        provider === 'kakao'
          ? await bridge.kakaoSignup(registerToken)
          : await bridge.appleSignup(registerToken);
      if (!result.success) {
        toast.attention('회원가입에 실패했습니다. 다시 시도해 주세요.');
        return;
      }
      await syncNativeToken();
      route.push('/');
    } catch {
      toast.attention('회원가입에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* 텍스트 부분 */}
      <div className={styles.textWrapper}>
        <Text variant='t4' color={vars.color.text.primary}>
          소비 기록을 시작하기 전,
          <br />
          약관에 동의해 주세요
        </Text>
        <Text variant='b2' color={vars.color.text.secondary}>
          팔수 항목에 동의하지 않으면 서비스 이용이 어려워요.
        </Text>
      </div>

      <div>
        {/* 동의하기 */}
        <div className={styles.tileWrapper}>
          <div className={styles.allAgreeTileWrapper}>
            <SelectionTile
              size='lg'
              label='모두 동의합니다'
              selected={allAgreed}
              onClick={handleAllAgree}
            />
          </div>
          <div className={styles.agreeTileWrapper}>
            <SelectionTile
              size='sm'
              label='이용약관 동의 (필수)'
              selected={termsOfService}
              onClick={toggleTermsOfService}
              href={EXTERNAL_URLS.TERMS_OF_SERVICE}
            />
            <SelectionTile
              size='sm'
              label='개인정보 수집 및 이용 동의 (필수)'
              selected={privacyPolicy}
              onClick={togglePrivacyPolicy}
              href={EXTERNAL_URLS.PRIVACY_POLICY}
            />
          </div>
        </div>
        {/* 버튼 */}
        <Button variant='primary' onClick={handleNext} disabled={!allAgreed || isPending} size='lg'>
          다음
        </Button>
      </div>
    </div>
  );
};
