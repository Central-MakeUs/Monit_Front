import React from 'react';
import * as styles from './OnboardingHighlight.css';

interface OnboardingHighlightProps {
  rect: DOMRect & { borderRadius?: string };
  glow: boolean;
}

export const OnboardingHighlight = ({ rect, glow }: OnboardingHighlightProps) => {
  return (
    <div
      className={styles.highlightBox({ glow })}
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        borderRadius: rect.borderRadius || '12px',
      }}
    />
  );
};
