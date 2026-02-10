import React from 'react';
import * as styles from './OnboardingOverlay.css';

interface OnboardingOverlayProps {
  onNext: () => void;
}

export const OnboardingOverlay = ({ onNext }: OnboardingOverlayProps) => {
  return <div className={styles.overlay} onClick={onNext} />;
};
