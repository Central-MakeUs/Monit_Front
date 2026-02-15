import { authenticatedApiClient, ENDPOINT, type ApiResponse } from '@/shared/api';

/** 회원 탈퇴 (204 No Content 또는 JSON 응답 모두 처리) */
export const deleteWithdraw = async (): Promise<ApiResponse<string>> => {
  const response = await authenticatedApiClient.delete(ENDPOINT.AUTH.WITHDRAW);

  if (!response.ok) {
    const body = await response.text();
    let message = response.statusText;
    try {
      const parsed = body ? JSON.parse(body) : {};
      if (parsed?.message) message = parsed.message;
    } catch {
      if (body) message = body;
    }
    throw new Error(message);
  }

  if (response.status === 204 || !response.body) {
    return { isSuccess: true, code: '200', message: '', result: '' };
  }
  return response.json<ApiResponse<string>>();
};
