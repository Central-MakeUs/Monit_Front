import { mutationOptions } from '@tanstack/react-query';
import { postInquirySend } from '../api/postInquirySend';
import type { components } from '@/shared/api/schema';

type InquiryRequest = components['schemas']['InquiryRequest'];

export const inquiryQueries = {
  sendMutation: () =>
    mutationOptions({
      mutationFn: (data: InquiryRequest) => postInquirySend(data),
    }),
};
