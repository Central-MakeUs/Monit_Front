/**
 * Native → Web 이벤트 상수
 * Native에서 Web으로 전송하는 이벤트 타입을 정의
 */
export const POST_MESSAGE_EVENT = {
  // 인증 관련 이벤트
  APPLE_LOGIN_SUCCESS: 'APPLE_LOGIN_SUCCESS',
  APPLE_LOGIN_FAILURE: 'APPLE_LOGIN_FAILURE',

  // 앱 상태 관련 이벤트
  APP_STATE_CHANGE: 'APP_STATE_CHANGE',

  // 일반 이벤트
  NATIVE_MESSAGE: 'NATIVE_MESSAGE',
} as const;

export type PostMessageEventType = (typeof POST_MESSAGE_EVENT)[keyof typeof POST_MESSAGE_EVENT];
