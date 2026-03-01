import { authApi, ENDPOINT } from '@/shared/api';
import type { NotificationResponseDTO } from '../model/types';

export const getNotifications = () =>
  authApi.get<NotificationResponseDTO[]>(ENDPOINT.ALERT.ALERT_LIST);
