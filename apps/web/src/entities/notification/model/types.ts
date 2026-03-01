import type { components } from '@/shared/api/schema';

export type NotificationResponseDTO = components['schemas']['AlertResponseDTO'];
export type NotificationType = NonNullable<NotificationResponseDTO['alertType']>;
export type NotificationListResponseDTO = components['schemas']['ApiResponseListAlertResponseDTO'];
