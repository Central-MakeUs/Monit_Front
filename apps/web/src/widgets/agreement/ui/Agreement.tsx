'use client';

import React, { useState } from 'react';
import * as styles from './Agreement.css';
import { Button, Text, vars } from '@/shared/ui';
import { SelectionTile } from '@/shared/ui/selectionTile/SelectionTile';
import { EXTERNAL_URLS } from '@/shared/constants/urls';

export const Agreement = () => {
  const [termsOfService, setTermsOfService] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  const allAgreed = termsOfService && privacyPolicy;

  const toggleTermsOfService = () => setTermsOfService((prev) => !prev);
  const togglePrivacyPolicy = () => setPrivacyPolicy((prev) => !prev);

  const handleAllAgree = () => {
    const next = !allAgreed;
    setTermsOfService(next);
    setPrivacyPolicy(next);
  };

  const handleNext = () => {
    // 다음 단계로 진행하는 로직
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
        <Button variant='primary' onClick={handleNext} disabled={!allAgreed} size='lg'>
          다음
        </Button>
      </div>
    </div>
  );
};
