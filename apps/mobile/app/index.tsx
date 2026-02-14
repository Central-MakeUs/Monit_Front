import { useRef, useState, useCallback } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import { WebView } from '@/shared/lib/bridge';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SystemUI from 'expo-system-ui';
import type WebViewType from 'react-native-webview';
import * as SplashScreen from 'expo-splash-screen';
import { WEBVIEW_URL } from '@/shared/constants/url';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import Constants from 'expo-constants';

const BACKGROUND_COLOR = '#F6F7F9';

SplashScreen.preventAutoHideAsync();

// 루트 배경색 설정 (iOS 노치 영역)
SystemUI.setBackgroundColorAsync(BACKGROUND_COLOR);

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
  const [initialUrl, setInitialUrl] = useState<string>(WEBVIEW_URL || '');

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
