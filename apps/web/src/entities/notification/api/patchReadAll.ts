import { authApi, ENDPOINT } from '@/shared/api';

export const patchReadAll = () => authApi.patch(ENDPOINT.ALERT.ALERT_READ_ALL);
