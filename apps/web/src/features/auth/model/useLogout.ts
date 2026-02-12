import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/stores/authStore';
import { useToast } from '@/shared/ui';
import { authQueries } from './authQueries';

export const useLogout = () => {
  const router = useRouter();
  const toast = useToast();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const { mutate: logout, isPending } = useMutation({
    ...authQueries.logoutMutation(),
    onSuccess: () => {
      clearAuth();
      toast.success('로그아웃이 완료되었어요');
      router.replace('/login');
    },
    onError: () => {
      toast.attention('로그아웃에 실패했어요. 다시 시도해주세요.');
    },
  });

  return { handleLogout: logout, isPending };
};
