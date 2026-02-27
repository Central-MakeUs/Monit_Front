import { queryOptions } from '@tanstack/react-query';
import { getNotifications } from '../api/getNotifications';

export const notificationQueries = {
  all: ['notification'] as const,
  list: () =>
    queryOptions({
      queryKey: [...notificationQueries.all, 'list'],
      queryFn: getNotifications,
    }),
};
