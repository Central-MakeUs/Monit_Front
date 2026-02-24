import 'dotenv/config';

module.exports = {
  expo: {
    name: '모닛',
    slug: 'monit',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY
      ? `kakao${process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY}`
      : 'mobile',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      usesAppleSignIn: true,
      bundleIdentifier: 'com.nitrogen18.store',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        LSApplicationQueriesSchemes: ['kakaokompassauth', 'kakaolink'],
        KAKAO_APP_KEY: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY || '',
      },
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      package: 'com.monit.app',
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      intentFilters: [
        {
          action: 'VIEW',
          category: ['DEFAULT', 'BROWSABLE'],
          data: {
            scheme: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY
              ? `kakao${process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY}`
              : 'mobile',
          },
        },
      ],
    },
    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-apple-authentication',
      'expo-secure-store',
      [
        '@react-native-kakao/core',
        {
          nativeAppKey: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY,
          android: {
            authCodeHandlerActivity: true,
          },
          ios: {
            handleKakaoOpenUrl: true,
          },
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            newArchEnabled: true,
            extraMavenRepos: ['https://devrepo.kakao.com/nexus/content/groups/public/'],
          },
          ios: {
            newArchEnabled: true,
          },
        },
      ],
    ],
    extra: {
      router: {},
      eas: {
        projectId: '37bf5280-606f-41d2-b9dd-1ef4be3b1507',
      },
      kakaoNativeAppKey: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY,
    },
  },
};
