import { createGlobalTheme } from '@vanilla-extract/css';
import {
  primitiveColors,
  semanticColors,
  spacing,
  radius,
  lineWidth,
  shadows,
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
} from './tokens';

export const vars = createGlobalTheme(':root', {
  color: {
    // Primitive Colors
    primitive: {
      primary: primitiveColors.primary,
      gray: primitiveColors.gray,
      red: primitiveColors.red,
      blue: primitiveColors.blue,
      green: primitiveColors.green,
      yellow: primitiveColors.yellow,
      static: primitiveColors.static,
    },
    // Semantic Colors
    text: {
      primary: semanticColors.text.primary,
      secondary: semanticColors.text.secondary,
      tertiary: semanticColors.text.tertiary,
      disabled: semanticColors.text.disabled,
      brand: semanticColors.text.brand,
      onBrand: semanticColors.text.onBrand,
      onDisabled: semanticColors.text.onDisabled,
      status: {
        success: semanticColors.text.status.success,
        warning: semanticColors.text.status.warning,
        danger: semanticColors.text.status.danger,
      },
    },
    border: {
      error: semanticColors.border.error,
      brand: semanticColors.border.brand,
      default: semanticColors.border.default,
      active: semanticColors.border.active,
    },
    icon: {
      primary: semanticColors.icon.primary,
      secondary: semanticColors.icon.secondary,
      subtle: semanticColors.icon.subtle,
      brand: semanticColors.icon.brand,
      onBrand: semanticColors.icon.onBrand,
      disabled: semanticColors.icon.disabled,
      tertiary: semanticColors.icon.tertiary,
    },
    bg: {
      base: semanticColors.bg.base,
      none: semanticColors.bg.none,
      overlay: semanticColors.bg.overlay,
      disable: semanticColors.bg.disable,
      brand: {
        default: semanticColors.bg.brand.default,
        hover: semanticColors.bg.brand.hover,
        active: semanticColors.bg.brand.active,
        subtle: semanticColors.bg.brand.subtle,
        unread: semanticColors.bg.brand.unread,
      },
      neutral: {
        default: semanticColors.bg.neutral.default,
        hover: semanticColors.bg.neutral.hover,
        active: semanticColors.bg.neutral.active,
        primary: semanticColors.bg.neutral.primary,
        secondary: semanticColors.bg.neutral.secondary,
        tertiary: semanticColors.bg.neutral.tertiary,
        subtle: semanticColors.bg.neutral.subtle,
      },
      surface: {
        primary: {
          default: semanticColors.bg.surface.primary.default,
          hover: semanticColors.bg.surface.primary.hover,
          active: semanticColors.bg.surface.primary.active,
          subtle: semanticColors.bg.surface.primary.subtle,
        },
        secondary: {
          default: semanticColors.bg.surface.secondary.default,
          hover: semanticColors.bg.surface.secondary.hover,
          active: semanticColors.bg.surface.secondary.active,
        },
      },
      status: {
        success: semanticColors.bg.status.success,
        warning: semanticColors.bg.status.warning,
        danger: semanticColors.bg.status.danger,
      },
      accent: {
        blue: {
          default: semanticColors.bg.accent.blue.default,
          subtle: semanticColors.bg.accent.blue.subtle,
        },
        green: {
          default: semanticColors.bg.accent.green.default,
          subtle: semanticColors.bg.accent.green.subtle,
        },
        yellow: {
          default: semanticColors.bg.accent.yellow.default,
          subtle: semanticColors.bg.accent.yellow.subtle,
        },
      },
    },
    indicator: {
      default: semanticColors.indicator.default,
      active: semanticColors.indicator.active,
      success: semanticColors.indicator.success,
      disable: semanticColors.indicator.disable,
    },
  },
  spacing: {
    xs: spacing.xs,
    xs2: spacing.xs2,
    sm: spacing.sm,
    sm2: spacing.sm2,
    md: spacing.md,
    lg: spacing.lg,
    lg2: spacing.lg2,
    xl: spacing.xl,
    '2xl': spacing['2xl'],
  },
  radius: {
    xs: radius.xs,
    xs2: radius.xs2,
    sm: radius.sm,
    sm2: radius.sm2,
    md: radius.md,
    lg: radius.lg,
    lg2: radius.lg2,
    xl: radius.xl,
    full: radius.full,
  },
  lineWidth: {
    sm: lineWidth.sm,
    md: lineWidth.md,
    lg: lineWidth.lg,
  },
  shadow: {
    shadow1: shadows.shadow1,
    shadow2: shadows.shadow2,
    shadow3: shadows.shadow3,
    shadow4: shadows.shadow4,
  },
  font: {
    family: {
      suit: fontFamily.suit,
    },
    weight: {
      medium: String(fontWeight.medium),
      semibold: String(fontWeight.semibold),
      bold: String(fontWeight.bold),
    },
    size: {
      b1: fontSize.b1,
      b2: fontSize.b2,
      b3: fontSize.b3,
      b4: fontSize.b4,
      b5: fontSize.b5,
      h1: fontSize.h1,
      h2: fontSize.h2,
      h3: fontSize.h3,
      h4: fontSize.h4,
      t1: fontSize.t1,
      t2: fontSize.t2,
      t3: fontSize.t3,
      t4: fontSize.t4,
    },
    lineHeight: {
      b1: lineHeight.b1,
      b2: lineHeight.b2,
      b3: lineHeight.b3,
      b4: lineHeight.b4,
      b5: lineHeight.b5,
      h1: lineHeight.h1,
      h2: lineHeight.h2,
      h3: lineHeight.h3,
      h4: lineHeight.h4,
      t1: lineHeight.t1,
      t2: lineHeight.t2,
      t3: lineHeight.t3,
      t4: lineHeight.t4,
    },
  },
});

// Re-export tokens for direct usage
export {
  primitiveColors,
  semanticColors,
  spacing,
  radius,
  lineWidth,
  shadows,
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
} from './tokens';

// Export typography styles for use in components
export { typography } from './tokens';
