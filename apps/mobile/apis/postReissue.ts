import { isAxiosError } from 'axios';
import { baseAPI } from './instance';

export const postReissue = async (
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string } | null> => {
  try {
    const response = await baseAPI.post(
      '/api/auth/reissue',
      {},
      { headers: { RefreshToken: refreshToken } }
    );

    const data = response.data?.result ?? response.data;
    const newAccessToken = data?.accessToken ?? data?.access_token;
    const newRefreshToken = data?.refreshToken ?? data?.refresh_token ?? refreshToken;

    if (!newAccessToken) return null;
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    if (isAxiosError(error)) {
      console.warn('[postReissue]', error.response?.status, error.response?.data);
    }
    return null;
  }
};
