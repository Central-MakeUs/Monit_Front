import { useRef, useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import { WebView } from '@/shared/lib/bridge';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SystemUI from 'expo-system-ui';
import type WebViewType from 'react-native-webview';
import * as SplashScreen from 'expo-splash-screen';
import { WEBVIEW_URL } from '@/shared/constants/url';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import Constants from 'expo-constants';
import type { WebViewNavigation } from 'react-native-webview';

// URL별 배경색 매핑
const getBackgroundColorForUrl = (url: string): string => {
  if (url.includes('/auth/agreement')) {
    return '#FFFFFF';
  } else {
    return '#F6F7F9';
  }
};

SplashScreen.preventAutoHideAsync();

// 카카오 SDK 초기화
const KAKAO_NATIVE_APP_KEY = Constants.expoConfig?.extra?.kakaoNativeAppKey;

if (KAKAO_NATIVE_APP_KEY) {
  try {
    initializeKakaoSDK(KAKAO_NATIVE_APP_KEY);
  } catch (error) {
    console.error('[Kakao SDK] Initialization failed:', error);
  }
} else {
  console.warn('[Kakao SDK] KAKAO_NATIVE_APP_KEY is not set');
}

export default function HomeScreen() {
  const webViewRef = useRef<WebViewType>(null);
  const [initialUrl] = useState<string>(WEBVIEW_URL || '');
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState<string>('#F6F7F9');

  // 초기 배경색 설정
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(currentBackgroundColor);
  }, [currentBackgroundColor]);

  // URL 변경 감지 및 배경색 업데이트
  const handleNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      const newColor = getBackgroundColorForUrl(navState.url);
      if (newColor !== currentBackgroundColor) {
        setCurrentBackgroundColor(newColor);
      }
    },
    [currentBackgroundColor]
  );

  // WebView 로드 완료 시 스플래시 화면 숨기기
  const handleWebViewLoad = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  if (!initialUrl) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: currentBackgroundColor }]}>
        <ActivityIndicator size='large' color='#007AFF' />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: currentBackgroundColor }]}>
        <WebView
          ref={webViewRef}
          source={{ uri: initialUrl }}
          style={[styles.webview, { backgroundColor: currentBackgroundColor }]}
          webviewDebuggingEnabled
          domStorageEnabled={true}
          // 모든 URL 허용
          originWhitelist={['*']}
          // JavaScript 활성화
          javaScriptEnabled={true}
          // 이벤트 핸들러
          onLoad={handleWebViewLoad}
          onNavigationStateChange={handleNavigationStateChange}
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
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
