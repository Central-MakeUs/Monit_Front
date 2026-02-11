import { ApiResponse, authApi, ENDPOINT } from '@/shared/api';
import { InquiryRequest } from '../model/type';

export const postInquirySend = async (body: InquiryRequest) => {
  return await authApi.post<ApiResponse>(ENDPOINT.INQUIRY.INQUIRY_SEND, body);
};
