# 💸 MONIT (모닛) - 소비의 맥락과 효용을 기록하는 가계부 서비스

<div align="center">
  <a href="https://github.com/Central-MakeUs/Monit_Front/wiki" target="_blank">
    <img src="https://img.shields.io/badge/docs-Wiki-0969DA?style=flat-square&logo=github&logoColor=white" alt="Wiki" />
  </a>
  <a href="https://apps.apple.com/kr/app/%EB%AA%A8%EB%8B%9B/id6759133655" target="_blank">
    <img src="https://img.shields.io/badge/iOS-App%20Store-black?style=flat-square&logo=apple&logoColor=white" alt="App Store" />
  </a>
  <a href="https://play.google.com/store/apps/details?id=com.monit.app&pcampaignid=web_share" target="_blank">
    <img src="https://img.shields.io/badge/Android-Google%20Play-34A853?style=flat-square&logo=googleplay&logoColor=white" alt="Google Play" />
  </a>
</div>
<br />

<a href="https://github.com/user-attachments/assets/7cd2b223-d9fa-4515-984e-b58a13b3375b">
  <img src="https://github.com/user-attachments/assets/7cd2b223-d9fa-4515-984e-b58a13b3375b" width="1920" />
</a>

<br />

> **"내 소비의 거품을 빼다"**

MONIT는 단순히 금액만 기록하는 가계부가 아니라,  
**소비 당시의 상황과 시간이 지난 뒤의 효용/만족도까지 함께 기록**하여  
소비 패턴을 더 입체적으로 돌아볼 수 있도록 돕는 서비스입니다.

<br/>

## ✨ 핵심 기능

### 1. 📝 소비 기록

- 금액뿐 아니라 **소비 당시의 상황 키워드와 감정 태그**를 함께 기록합니다.
- 단순 지출 내역이 아니라 **소비 맥락 데이터**를 남길 수 있습니다.

### 2. 🔁 소비 회고

- 시간이 지난 뒤 과거 소비에 대해 **효용 / 만족도**를 다시 입력합니다.
- 당시엔 좋았던 소비가 실제로도 의미 있었는지 되돌아볼 수 있습니다.

### 3. 📊 리포트 분석

- 주간 / 월간 기준으로 **상황 × 효용 패턴 분석 리포트**를 제공합니다.
- 금액 중심이 아닌, **반복되는 소비 맥락과 만족도 흐름**을 파악할 수 있습니다.

### 4. 🔐 소셜 로그인

- **카카오 로그인**, **애플 로그인**을 지원합니다.
- 모바일 네이티브 기능과 웹을 연결한 하이브리드 구조로 인증 경험을 제공합니다.

### 5. 🔔 리마인드 알림

- 소비 회고를 놓치지 않도록 **리마인드 알림**을 제공합니다.
- 기록 이후의 재평가 과정을 자연스럽게 유도합니다.

<br />

## 🛠 기술 스택

| 영역 | 기술 |
| --- | --- |
| **Web** | Next.js 16.1.0, React 19, TypeScript 5.9.2 |
| **Mobile** | Expo 54, React Native 0.81, Expo Router |
| **Architecture** | Monorepo, Hybrid WebView, FSD |
| **State Management** | TanStack Query, Zustand |
| **Validation** | Zod |
| **Styling** | Vanilla Extract |
| **HTTP Client** | Ky, Axios |
| **Bridge** | `@repo/bridge`, `@webview-bridge/web`, `@webview-bridge/react-native` |
| **Package Manager** | pnpm 9 |
| **Monorepo Tooling** | Turborepo |
| **Design / Docs** | Storybook |
| **Lint / Format** | ESLint, Prettier |
| **Git Hooks** | Lefthook |
| **CI/CD** | GitHub Actions, Vercel, EAS Build |

<br />
