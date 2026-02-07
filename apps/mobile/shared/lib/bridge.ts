import { bridge, createWebView, postMessageSchema } from '@webview-bridge/react-native';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as WebBrowser from 'expo-web-browser';
import type { AppleLoginResult } from '@repo/bridge';
import { POST_MESSAGE_EVENT } from '@repo/bridge';

/**
 * Web → Native 브릿지 설정
 * Web 앱에서 호출할 수 있는 Native 메서드들을 정의
 */
export const appBridge = bridge({
  async getMessage(): Promise<string> {
    return 'Hello from Native!';
  },

  async getPlatform(): Promise<'ios' | 'android'> {
    return Platform.OS as 'ios' | 'android';
  },

  async requestAppleLogin(): Promise<AppleLoginResult> {
    if (Platform.OS !== 'ios') {
      throw new Error('애플 로그인은 iOS에서만 사용 가능합니다.');
    }
    // TODO: expo-apple-authentication 연동 후 구현
    throw new Error('애플 로그인이 아직 구현되지 않았습니다.');
  },

  async openInAppBrowser(url: string): Promise<void> {
    await WebBrowser.openBrowserAsync(url);
  },

  async hapticFeedback(
    type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error'
  ): Promise<void> {
    const hapticMap = {
      light: Haptics.ImpactFeedbackStyle.Light,
      medium: Haptics.ImpactFeedbackStyle.Medium,
      heavy: Haptics.ImpactFeedbackStyle.Heavy,
      success: Haptics.NotificationFeedbackType.Success,
      warning: Haptics.NotificationFeedbackType.Warning,
      error: Haptics.NotificationFeedbackType.Error,
    };

    if (type === 'success' || type === 'warning' || type === 'error') {
      await Haptics.notificationAsync(hapticMap[type] as Haptics.NotificationFeedbackType);
    } else {
      await Haptics.impactAsync(hapticMap[type] as Haptics.ImpactFeedbackStyle);
    }
  },
});

/**
 * Native → Web 브릿지 설정 (PostMessage)
 * Native에서 Web으로 이벤트를 전송할 때 사용하는 스키마 정의
 */
export const appPostMessageSchema = postMessageSchema({
  [POST_MESSAGE_EVENT.APPLE_LOGIN_SUCCESS]: {
    validate: (data: unknown) => data as AppleLoginResult,
  },
  [POST_MESSAGE_EVENT.APPLE_LOGIN_FAILURE]: {
    validate: (data: unknown) => data as { error: string },
  },
  [POST_MESSAGE_EVENT.APP_STATE_CHANGE]: {
    validate: (data: unknown) => data as { state: 'active' | 'background' | 'inactive' },
  },
  [POST_MESSAGE_EVENT.NATIVE_MESSAGE]: {
    validate: (data: unknown) => data as { message: string },
  },
});

/** Bridge 타입 export (Web에서 사용) */
export type AppBridgeType = typeof appBridge;
export type AppPostMessageSchemaType = typeof appPostMessageSchema;

/**
 * WebView 및 postMessage export
 * - WebView: Web 콘텐츠를 표시하는 컴포넌트
 * - postMessage: Native → Web 이벤트 전송 함수
 */
export const { WebView, postMessage } = createWebView({
  bridge: appBridge,
  postMessageSchema: appPostMessageSchema,
  debug: __DEV__,
  fallback: (method) => {
    console.warn(`[Bridge] Method '${method}' not found in native`);
  },
});
