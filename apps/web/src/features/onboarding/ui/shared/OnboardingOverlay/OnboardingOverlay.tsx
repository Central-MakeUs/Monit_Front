import React from 'react';
import * as styles from './OnboardingOverlay.css';

interface OnboardingOverlayProps {
  onNext: () => void;
  dim?: boolean;
}

export const OnboardingOverlay = ({ onNext, dim = false }: OnboardingOverlayProps) => {
  return <div className={dim ? styles.overlayDim : styles.overlay} onClick={onNext} />;
};
