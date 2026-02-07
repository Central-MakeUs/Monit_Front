import { z } from 'zod';
import { POST_MESSAGE_EVENT } from './events';

/**
 * 애플 로그인 결과 타입
 */
export interface AppleLoginResult {
  identityToken: string;
  authorizationCode: string;
  user?: {
    email?: string;
    name?: {
      firstName?: string;
      lastName?: string;
    };
  };
}

/**
 * Web → Native 브릿지 메서드 타입
 * Web에서 호출 가능한 Native 메서드들을 정의
 */
export type AppBridge = {
  // 기본 메서드
  getMessage: () => Promise<string>;

  // 플랫폼 정보
  getPlatform: () => Promise<'ios' | 'android'>;

  // 소셜 로그인
  requestAppleLogin: () => Promise<AppleLoginResult>;
};

/**
 * Native → Web PostMessage 스키마 타입
 * Native에서 Web으로 전송하는 이벤트 데이터 타입을 정의
 */
export type AppPostMessageSchema = {
  [POST_MESSAGE_EVENT.APPLE_LOGIN_SUCCESS]: AppleLoginResult;
  [POST_MESSAGE_EVENT.APPLE_LOGIN_FAILURE]: { error: string };
  [POST_MESSAGE_EVENT.APP_STATE_CHANGE]: { state: 'active' | 'background' | 'inactive' };
  [POST_MESSAGE_EVENT.NATIVE_MESSAGE]: { message: string };
  [key: string]: unknown;
};

export const postMessageSchemas = {
  [POST_MESSAGE_EVENT.APPLE_LOGIN_SUCCESS]: z.object({
    identityToken: z.string(),
    authorizationCode: z.string(),
    user: z
      .object({
        email: z.string().optional(),
        name: z
          .object({
            firstName: z.string().optional(),
            lastName: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
  }),
  [POST_MESSAGE_EVENT.APPLE_LOGIN_FAILURE]: z.object({
    error: z.string(),
  }),
  [POST_MESSAGE_EVENT.APP_STATE_CHANGE]: z.object({
    state: z.enum(['active', 'background', 'inactive']),
  }),
  [POST_MESSAGE_EVENT.NATIVE_MESSAGE]: z.object({
    message: z.string(),
  }),
} as const;
