import { useEffect, useState } from 'react';

interface KakaoAuth {
  authorize: (settings: { redirectUri: string }) => void;
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;
  logout: (callback?: () => void) => void;
}

interface KakaoSDK {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Auth: KakaoAuth;
}

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}

interface KakaoSDKReturn {
  isLoaded: boolean;
  isLoading: boolean;
}

interface KakaoSDKOptions {
  onError?: (error: Error) => void;
}

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

export const useKakaoSDK = (options: KakaoSDKOptions = {}): KakaoSDKReturn => {
  const { onError } = options;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 환경 변수 확인
    if (!KAKAO_JS_KEY) {
      const error = new Error('NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY 환경 변수가 설정되지 않았습니다.');
      console.error('[Kakao SDK]', error);
      onError?.(error);
      setIsLoading(false);
      return;
    }

    // 이미 로드되어 있는 경우
    if (typeof window !== 'undefined' && window.Kakao !== undefined) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
      setIsLoaded(true);
      setIsLoading(false);
      return;
    }

    // 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js';
    script.integrity = 'sha384-tJkjbtDbvoxO+diRuDtwRO9JXR7pjWnfjfRn5ePUpl7e7RJCxKCwwnfqUAdXh53p';
    script.crossOrigin = 'anonymous';
    script.async = true;

    script.onload = () => {
      try {
        if (window.Kakao) {
          if (!window.Kakao.isInitialized()) {
            window.Kakao.init(KAKAO_JS_KEY);
            console.log('[Kakao SDK] Initialized');
          }
          setIsLoaded(true);
        } else {
          const error = new Error('Kakao SDK를 로드했지만 window.Kakao를 찾을 수 없습니다.');
          console.error('[Kakao SDK]', error);
          onError?.(error);
        }
      } catch (error) {
        console.error('[Kakao SDK] Init error:', error);
        onError?.(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    script.onerror = () => {
      const error = new Error('Kakao SDK 스크립트를 로드하는데 실패했습니다.');
      console.error('[Kakao SDK]', error);
      onError?.(error);
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js"]'
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [onError]);

  return { isLoaded, isLoading };
};
