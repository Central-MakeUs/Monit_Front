'use client';

import React from 'react';
import { TestMode } from '../../model/types';
import * as styles from './TestModeButtons.css';

export interface TestModeButtonsProps {
  testMode: TestMode;
  onTestModeChange: (mode: TestMode) => void;
}

/**
 * 개발 전용 테스트 모드 버튼 컴포넌트
 * API 연동 전 퍼블리싱 테스트를 위한 UI
 */
export const TestModeButtons = ({ testMode, onTestModeChange }: TestModeButtonsProps) => {
  const buttons: Array<{ mode: TestMode; label: string }> = [
    { mode: 'empty-never', label: 'Empty Ver.1' },
    { mode: 'empty-today', label: 'Empty Ver.2' },
    { mode: 'empty-date', label: 'Empty Ver.3' },
    { mode: 'has-expenses', label: '소비 목록' },
  ];

  return (
    <div className={styles.container}>
      {buttons.map(({ mode, label }) => (
        <button
          key={mode}
          className={`${styles.button} ${testMode === mode ? styles.buttonActive : ''}`}
          onClick={() => onTestModeChange(mode)}>
          {label}
        </button>
      ))}
    </div>
  );
};
