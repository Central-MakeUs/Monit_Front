'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/stores/authStore';
import { useToast } from '@/shared/ui';
import { authQueries } from './authQueries';

export const useWithdraw = () => {
  const router = useRouter();
  const toast = useToast();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const { mutate: withdraw, isPending } = useMutation({
    ...authQueries.withdrawMutation(),
    onSuccess: () => {
      clearAuth();
      toast.success('회원탈퇴가 완료되었어요');
      router.replace('/login');
    },
    onError: () => {
      toast.attention('회원 탈퇴에 실패했어요. 다시 시도해주세요.');
    },
  });

  return { handleWithdraw: withdraw, isPending };
};
