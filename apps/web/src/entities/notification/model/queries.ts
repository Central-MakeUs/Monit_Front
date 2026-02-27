import { queryOptions } from '@tanstack/react-query';
import { getNotifications } from '../api/getNotifications';
import { getAlertUnreadStatus } from '../api/getAlertUnreadStatus';

export const notificationQueries = {
  all: ['notification'] as const,
  list: () =>
    queryOptions({
      queryKey: [...notificationQueries.all, 'list'],
      queryFn: getNotifications,
    }),
  unreadStatus: () =>
    queryOptions({
      queryKey: [...notificationQueries.all, 'unreadStatus'],
      queryFn: getAlertUnreadStatus,
      refetchOnWindowFocus: true,
    }),
};
