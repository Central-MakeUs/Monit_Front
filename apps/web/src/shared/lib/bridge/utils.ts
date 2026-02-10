/**
 * 플랫폼 타입 반환
 */
export const getPlatformType = (): 'ios' | 'android' | 'web' => {
  if (typeof window === 'undefined') return 'web';

  const isWebView = !!(window as unknown as { ReactNativeWebView?: unknown }).ReactNativeWebView;
  if (!isWebView) return 'web';

  const userAgent = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
  if (/android/.test(userAgent)) return 'android';
  return 'web';
};
