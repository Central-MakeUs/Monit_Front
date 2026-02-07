import { useRef, useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform, Linking } from 'react-native';
import { WebView } from '@/shared/lib/bridge';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SystemUI from 'expo-system-ui';
import type WebViewType from 'react-native-webview';
import * as SplashScreen from 'expo-splash-screen';

const BACKGROUND_COLOR = '#F6F7F9';

SplashScreen.preventAutoHideAsync();

// 루트 배경색 설정 (iOS 노치 영역)
SystemUI.setBackgroundColorAsync(BACKGROUND_COLOR);

export default function HomeScreen() {
  const webViewRef = useRef<WebViewType>(null);
  const [initialUrl, setInitialUrl] = useState<string>(process.env.EXPO_PUBLIC_WEB_URL || '');

  // 딥링크 URL 파싱
  const parseDeepLink = useCallback((url: string) => {
    try {
      const urlObj = new URL(url);
      return {
        path: urlObj.pathname.replace(/^\//, ''), // 앞의 / 제거
        queryParams: Object.fromEntries(urlObj.searchParams.entries()),
      };
    } catch {
      // URL 파싱 실패시 빈 객체 반환
      return { path: '', queryParams: {} };
    }
  }, []);

  // 딥링크 URL을 웹 URL로 변환
  const buildWebUrl = useCallback(
    (url: string): string => {
      const baseUrl = process.env.EXPO_PUBLIC_WEB_URL;
      if (!baseUrl) {
        throw new Error('EXPO_PUBLIC_WEB_URL is not set');
      }

      const { path, queryParams } = parseDeepLink(url);
      let webUrl = baseUrl;

      // path 추가
      if (path) {
        webUrl += `/${path}`;
      }

      // query params 추가
      if (queryParams && Object.keys(queryParams).length > 0) {
        const params = new URLSearchParams(queryParams).toString();
        webUrl += `?${params}`;
      }

      return webUrl;
    },
    [parseDeepLink]
  );

  // WebView의 URL을 변경
  const navigateWebView = useCallback((url: string) => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.location.href = '${url}';
        true;
      `);
    }
  }, []);

  // 딥링크 처리
  useEffect(() => {
    // 1. 앱이 종료된 상태에서 링크로 열릴 때의 초기 URL 처리
    const handleInitialUrl = async () => {
      try {
        const url = await Linking.getInitialURL();
        if (url) {
          const webUrl = buildWebUrl(url);
          setInitialUrl(webUrl);
        }
      } catch (error) {
        console.error('Failed to get initial URL:', error);
      }
    };

    handleInitialUrl();

    // 2. 앱이 실행 중일 때 링크로 열릴 때의 URL 처리
    const subscription = Linking.addEventListener('url', ({ url }) => {
      try {
        const webUrl = buildWebUrl(url);
        navigateWebView(webUrl);
      } catch (error) {
        console.error('Failed to handle deep link:', error);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [buildWebUrl, navigateWebView]);

  // WebView 로드 완료 시 스플래시 화면 숨기기
  const handleWebViewLoad = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  if (!initialUrl) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#007AFF' />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: initialUrl }}
          style={styles.webview}
          webviewDebuggingEnabled
          domStorageEnabled={true}
          // 쿠키 설정
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          // 모든 URL 허용
          originWhitelist={['*']}
          // JavaScript 활성화
          javaScriptEnabled={true}
          // 이벤트 핸들러
          onLoad={handleWebViewLoad}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          // Android 설정
          allowFileAccess={true}
          mixedContentMode='always'
          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          // 스크롤 설정
          scrollEnabled={true}
          bounces={Platform.OS === 'ios'}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  webview: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
});
