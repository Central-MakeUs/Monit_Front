import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useModal } from '@/shared/hooks';
import { isValidEmail, hasEmailError } from '@/shared/lib/validation';
import { inquiryQueries } from './inquiryQueries';
import { useToast } from '@/shared/ui';
import { handleApiError } from '@/shared/api';

/**
 * 문의 폼 상태 및 동작을 관리하는 커스텀 훅
 * 이메일/내용 입력, 유효성 검증, 제출, 뒤로가기 로직을 캡슐화합니다.
 */
export const useInquiryForm = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, openModal, closeModal } = useModal();

  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  // API 요청
  const { mutate: sendInquiry, isPending } = useMutation({
    ...inquiryQueries.sendMutation(),
    onSuccess: () => {
      toast.success('등록 완료, 곧 답변드릴게요!');
      router.back();
    },
    onError: (error) => {
      handleApiError(error, {
        toast,
        fallback: '문의 등록에 실패했어요. 다시 시도해 주세요.',
        context: 'inquiry.send',
      });
    },
  });

  // 유효성 검증
  const isEmailError = hasEmailError(email);
  const isFormValid = email.trim() !== '' && isValidEmail(email) && content.trim() !== '';

  // 제출 핸들러
  const handleSubmit = useCallback(() => {
    sendInquiry({ userEmail: email, content });
  }, [email, content, sendInquiry]);

  // 뒤로가기 핸들러 (변경사항 있으면 모달 띄우기)
  const handleBack = useCallback(() => {
    if (email || content) {
      openModal();
    } else {
      router.back();
    }
  }, [email, content, openModal, router]);

  // 모달에서 나가기 확인
  const handleConfirmBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    // 상태
    email,
    content,
    isEmailError,
    isFormValid,
    isPending,

    // 모달
    isModalOpen: isOpen,
    closeModal,

    // 액션
    setEmail,
    setContent,
    handleSubmit,
    handleBack,
    handleConfirmBack,
  };
};
