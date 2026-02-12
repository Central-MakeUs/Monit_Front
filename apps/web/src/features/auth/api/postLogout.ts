import { authApi, ENDPOINT } from '@/shared/api';

export const postLogout = async () => {
  return await authApi.post<string>(ENDPOINT.AUTH.LOGOUT);
};
