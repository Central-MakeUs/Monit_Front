'use client';

import { TopBar, Text, vars, Button, InputField, TextInput, TextArea, useToast } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import * as styles from './SupportInquiry.css';

export const SupportInquiry = () => {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailError = email.trim() !== '' && !isValidEmail(email);
  const isValid = email.trim() !== '' && isValidEmail(email) && content.trim() !== '';

  const handleSubmit = () => {
    startTransition(async () => {
      // TODO: API 호출
      // TODO: 토스트? 호출
      toast.success('등록 완료, 곧 답변드릴게요!');
      router.back();
    });
  };

  return (
    <>
      <TopBar
        left={<IcLeftChevron onClick={() => router.back()} />}
        center={
          <Text variant='t1' color={vars.color.text.primary}>
            {'1:1 문의'}
          </Text>
        }
      />
      <div className={styles.container}>
        <div className={styles.formGroup}>
          <InputField label={'답변받을 이메일'} labelVariant='b2'>
            <TextInput
              placeholder='답변받을 이메일 주소를 입력해주세요'
              value={email}
              onValueChange={setEmail}
              error={isEmailError}
              errorMessage={isEmailError ? '이메일 형식이 올바르지 않아요.' : undefined}
            />
          </InputField>
          <div className={styles.textAreaWrapper}>
            <Text variant='h4' color={vars.color.text.primary}>
              문의내용
            </Text>
            <TextArea
              placeholder='문의 사항을 입력해주세요'
              maxLength={1000}
              value={content}
              onChange={setContent}
            />
          </div>
        </div>
        <Button disabled={!isValid || isPending} onClick={handleSubmit}>
          등록하기
        </Button>
      </div>
    </>
  );
};
