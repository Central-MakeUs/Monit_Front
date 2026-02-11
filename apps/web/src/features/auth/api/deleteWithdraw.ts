import { authApi, ENDPOINT } from '@/shared/api';

export const deleteWithdraw = async () => {
  return await authApi.delete<string>(ENDPOINT.AUTH.WITHDRAW);
};
