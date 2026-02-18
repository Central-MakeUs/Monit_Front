'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/shared/ui';
import { clearAllUserStorage } from '@/shared/utils';
import { authQueries } from './authQueries';

export const useWithdraw = () => {
  const router = useRouter();
  const toast = useToast();

  const { mutate: withdraw, isPending } = useMutation({
    ...authQueries.withdrawMutation(),
    onSuccess: () => {
      clearAllUserStorage();
      toast.success('회원탈퇴가 완료되었어요');
      router.replace('/login');
    },
    onError: (error: Error) => {
      const message =
        error?.message && error.message !== 'Failed to fetch'
          ? error.message
          : '회원 탈퇴에 실패했어요. 다시 시도해주세요.';
      toast.attention(message);
    },
  });

  return { handleWithdraw: withdraw, isPending };
};
