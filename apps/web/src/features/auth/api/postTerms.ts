import { authApi, ENDPOINT } from '@/shared/api';

export const postTerms = async () => {
  return await authApi.post<string>(ENDPOINT.AUTH.TERMS);
};
