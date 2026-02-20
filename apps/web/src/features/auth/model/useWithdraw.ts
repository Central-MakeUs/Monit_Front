'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/ui';
import { clearAllUserStorage } from '@/shared/utils';
import { authQueries } from './authQueries';
import { useBridge } from '@/shared/lib/bridge';

export const useWithdraw = () => {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const bridge = useBridge();

  const { mutate: withdraw, isPending } = useMutation({
    ...authQueries.withdrawMutation(),
    onSuccess: async () => {
      if (bridge) {
        try {
          await bridge.requestWithdraw();
        } catch {
          // 네이티브 회원탈퇴 실패해도 로컬 정리 진행
        }
      }
      clearAllUserStorage();
      // 이전 사용자 월별/요약 등 모든 쿼리 캐시 제거 (재로그인 시 다른 사용자 데이터 노출 방지)
      queryClient.clear();
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
