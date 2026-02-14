import { authApi, ENDPOINT } from '@/shared/api';

export const patchTerms = async () => {
  return await authApi.patch<string>(ENDPOINT.AUTH.TERMS);
};
