import { authApi, ENDPOINT } from '@/shared/api';

export const getAlertUnreadStatus = () => authApi.get<boolean>(ENDPOINT.ALERT.ALERT_UNREAD_STATUS);
