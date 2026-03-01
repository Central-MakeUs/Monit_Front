import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { getNotifications } from '../api/getNotifications';
import { getAlertUnreadStatus } from '../api/getAlertUnreadStatus';
import { patchReadAll } from '../api/patchReadAll';

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
  readAllMutation: () =>
    mutationOptions({
      mutationFn: patchReadAll,
    }),
};
