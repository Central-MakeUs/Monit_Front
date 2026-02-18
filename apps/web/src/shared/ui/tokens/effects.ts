export const shadows = {
  shadow1: '0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.05)',
  shadow2: '0px 2px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.05)',
  shadow3: '0px 6px 12px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.04)',
  shadow4: '0px 14px 20px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.04)',

  /** Onboarding Highlight Glow */
  glow: '0px 2px 20px 0px rgba(255, 255, 255, 0.80)',
} as const;

export type Shadows = typeof shadows;
