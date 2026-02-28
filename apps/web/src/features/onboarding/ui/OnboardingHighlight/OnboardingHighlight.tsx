import React from 'react';
import * as styles from './OnboardingHighlight.css';

interface OnboardingHighlightProps {
  rect: DOMRect & { borderRadius?: string };
  glow: boolean;
  padding?: number;
  borderRadius?: string;
}

export const OnboardingHighlight = ({
  rect,
  glow,
  padding = 0,
  borderRadius,
}: OnboardingHighlightProps) => {
  return (
    <div
      className={styles.highlightBox({ glow })}
      style={{
        left: rect.left - padding,
        top: rect.top,
        width: rect.width + padding * 2,
        height: rect.height,
        borderRadius: borderRadius ?? rect.borderRadius ?? '12px',
      }}
    />
  );
};
