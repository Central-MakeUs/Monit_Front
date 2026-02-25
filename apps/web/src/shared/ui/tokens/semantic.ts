import { primitiveColors } from './colors';

export const semanticColors = {
  text: {
    primary: primitiveColors.gray[800],
    secondary: primitiveColors.gray[500],
    tertiary: primitiveColors.gray[300],
    disabled: primitiveColors.gray[400],
    brand: primitiveColors.primary[500],
    onBrand: primitiveColors.gray[0],
    onDisabled: primitiveColors.gray[400],
    subtle: primitiveColors.gray[300],
    status: {
      success: primitiveColors.green[300],
      warning: primitiveColors.yellow[400],
      danger: primitiveColors.red[500],
    },
    accent: {
      blue: {
        subtle: primitiveColors.blue[400],
        default: primitiveColors.gray[0],
      },
      green: {
        subtle: primitiveColors.green[400],
        default: primitiveColors.gray[0],
      },
      yellow: {
        subtle: primitiveColors.yellow[400],
        default: primitiveColors.gray[0],
      },
    },
  },
  border: {
    error: primitiveColors.red[500],
    success: primitiveColors.green[300],
    brand: primitiveColors.green[300],
    default: primitiveColors.gray[200],
    active: primitiveColors.gray[800],
    secondary: primitiveColors.gray[0],
  },
  icon: {
    primary: primitiveColors.gray[0],
    secondary: primitiveColors.gray[800],
    tertiary: primitiveColors.gray[500],
    subtle: primitiveColors.gray[300],
    brand: primitiveColors.primary[500],
    onBrand: primitiveColors.gray[0],
    disabled: primitiveColors.gray[400],
    card: primitiveColors.gray[600],
  },
  bg: {
    base: primitiveColors.gray[50],
    none: 'transparent',
    overlay: primitiveColors.static.overlay,
    brand: {
      default: primitiveColors.primary[500],
      hover: primitiveColors.primary[600],
      active: primitiveColors.primary[700],
      subtle: primitiveColors.primary[50],
      unread: primitiveColors.primary[25],
    },
    neutral: {
      primary: primitiveColors.gray[100],
      secondary: primitiveColors.gray[200],
      tertiary: primitiveColors.gray[300],
      subtle: primitiveColors.gray[75],
      default: primitiveColors.gray[100],
      hover: primitiveColors.gray[200],
      active: primitiveColors.gray[300],
    },
    surface: {
      primary: {
        default: primitiveColors.gray[800],
        hover: primitiveColors.gray[900],
        active: primitiveColors.gray[950],
        subtle: primitiveColors.gray[700],
      },
      secondary: {
        default: primitiveColors.gray[0],
        hover: primitiveColors.gray[50],
        active: primitiveColors.gray[100],
      },
    },
    disable: primitiveColors.gray[100],
    accent: {
      red: {
        default: primitiveColors.red[400],
        subtle: primitiveColors.red[50],
      },
      blue: {
        default: primitiveColors.blue[300],
        subtle: primitiveColors.blue[100],
      },
      green: {
        default: primitiveColors.green[300],
        subtle: primitiveColors.green[50],
      },
      yellow: {
        default: primitiveColors.yellow[300],
        subtle: primitiveColors.yellow[50],
      },
    },
    reportSummary: {
      bar: {
        strong: primitiveColors.primary[600],
        medium: primitiveColors.primary[400],
        light: primitiveColors.primary[200],
        subtle: primitiveColors.primary[50],
      },
    },
    status: {
      success: primitiveColors.green[50],
      warning: primitiveColors.yellow[50],
      danger: primitiveColors.red[50],
    },
  },
  indicator: {
    default: primitiveColors.gray[300],
    active: primitiveColors.primary[500],
    success: primitiveColors.green[200],
    disable: primitiveColors.gray[100],
  },
} as const;

export type SemanticColors = typeof semanticColors;
