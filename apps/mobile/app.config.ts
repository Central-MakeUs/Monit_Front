module.exports = {
  expo: {
    name: '질소가계부',
    slug: 'mobile',
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
      package: 'com.nitrogen18.store',
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
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            newArchEnabled: true,
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
        projectId: '483d13c9-5344-4468-ba1f-f7098764a2ff',
      },
      // 환경 변수를 앱에서 사용할 수 있도록 전달
      kakaoNativeAppKey: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY,
    },
  },
};
