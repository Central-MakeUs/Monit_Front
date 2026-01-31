/**
 * Primitive Colors
 *
 * 플랫폼 독립적인 원시 색상 값들입니다.
 * HEX 값으로 정의되어 Web과 React Native에서 공유할 수 있습니다.
 *
 * 사용 예시:
 * - Web: CSS 변수나 스타일 객체에서 직접 사용
 * - React Native: StyleSheet이나 네이티브 컴포넌트에서 직접 사용
 */
export const primitiveColors = {
  primary: {
    25: '#fff8f4',
    50: '#ffe4e0',
    100: '#ffcec7',
    200: '#ffb6ac',
    300: '#ff9486',
    400: '#ff806f',
    500: '#ff604b',
    600: '#f14933',
    700: '#e52e16',
    750: '#ca250f',
    800: '#971503',
    900: '#6b0900',
  },
  gray: {
    0: '#ffffff',
    50: '#f6f7f9',
    75: '#eff2f8',
    100: '#e9eaed',
    200: '#d2d4da',
    300: '#b4b7c0',
    400: '#8e929d',
    500: '#757a87',
    600: '#5c6270',
    700: '#454852',
    800: '#292b32',
    900: '#1d1f25',
    950: '#131417',
    1000: '#000000',
  },
  red: {
    50: '#ffe9eb',
    100: '#ffbcc0',
    200: '#ff9ca2',
    300: '#ff6e78',
    400: '#ff525d',
    500: '#ff2735',
    600: '#e82330',
    700: '#b51c26',
    800: '#8c151d',
    900: '#6b1016',
  },
  blue: {
    50: '#eef7ff',
    100: '#e6f3fe',
    200: '#cbe6fe',
    300: '#56aefb',
    400: '#2999fa',
    500: '#117edf',
    600: '#0664b5',
    700: '#004686',
    800: '#002a50',
    900: '#001a30',
  },
  green: {
    25: '#f2fbf9',
    50: '#d9f6f0',
    100: '#b0ede1',
    200: '#00c69d',
    300: '#00b28d',
    400: '#009e7e',
    500: '#009576',
    600: '#00775e',
    700: '#005947',
    800: '#004537',
    900: '#0a2c24',
  },
  yellow: {
    25: '#fffaf3',
    50: '#fff3db',
    100: '#ffe9c1',
    200: '#ffe0a3',
    300: '#ffc65d',
    400: '#ffb114',
    500: '#e2a01b',
    600: '#b57e26',
    700: '#875505',
    800: '#664511',
    900: '#4b320c',
  },
  static: {
    transparent: 'transparent',
    white: '#ffffff',
    black: '#000000',
    overlay: 'rgba(0, 0, 0, 0.6)',
    shadow: {
      shadow1: 'rgba(0, 0, 0, 0.04)',
      shadow2: 'rgba(0, 0, 0, 0.05)',
      shadow3: 'rgba(0, 0, 0, 0.08)',
      shadow4: 'rgba(0, 0, 0, 0.12)',
    },
  },
} as const;

export type PrimitiveColors = typeof primitiveColors;
