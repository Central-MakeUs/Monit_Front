'use client';

import {
  TopBar,
  Text,
  vars,
  Button,
  InputField,
  TextInput,
  TextArea,
  AlertDialog,
} from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import React from 'react';
import * as styles from './SupportInquiry.css';
import { useInquiryForm } from '@/features/inquiry';

export const SupportInquiry = () => {
  const {
    email,
    content,
    isEmailError,
    isFormValid,
    isPending,
    isModalOpen,
    closeModal,
    setEmail,
    setContent,
    handleSubmit,
    handleBack,
    handleConfirmBack,
  } = useInquiryForm();

  return (
    <>
      <TopBar
        left={<IcLeftChevron onClick={handleBack} />}
        center={
          <Text variant='t1' color={vars.color.text.primary}>
            1:1 문의
          </Text>
        }
      />
      <div className={styles.container}>
        <div className={styles.formGroup}>
          <InputField label={'답변받을 이메일'} labelVariant='b2'>
            <TextInput
              placeholder='답변받을 이메일 주소를 입력해주세요'
              inputMode='email'
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
        <Button disabled={!isFormValid || isPending} onClick={handleSubmit}>
          등록하기
        </Button>
        <AlertDialog
          isOpen={isModalOpen}
          onClose={closeModal}
          variant='left'
          title='작성 중인 문의에서 나가시겠어요?'
          description='지금 나가면 작성한 내용이 저장되지 않아요.'
          cancelText='나가기'
          confirmText='작성 계속하기'
          onCancel={handleConfirmBack}
        />
      </div>
    </>
  );
};
