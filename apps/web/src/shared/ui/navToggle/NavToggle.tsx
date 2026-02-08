'use client';

import React, { useState } from 'react';
import * as styles from './NavToggle.css';
import { useToggleIndicator } from '../../hooks/useToggleIndicator';
import { IcHome, IcReport } from 'public/icons';
import { Text } from '../text';

export type NavToggleOption = 'home' | 'report';

export interface NavToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: NavToggleOption;
  defaultValue?: NavToggleOption;
  onChange?: (value: NavToggleOption) => void;
}

export const NavToggle = ({
  value: controlledValue,
  defaultValue = 'home',
  onChange,
  className,
  ...props
}: NavToggleProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<NavToggleOption>(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const {
    containerRef,
    firstRef: homeRef,
    secondRef: listRef,
    indicatorStyle,
  } = useToggleIndicator({
    activeIndex: value === 'home' ? 0 : 1,
    styleVars: { x: styles.indicatorXVar, width: styles.indicatorWVar },
  });

  const handleChange = (newValue: NavToggleOption) => {
    if (newValue === value) return;

    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div
      className={`${styles.container} ${className || ''}`}
      role='tablist'
      aria-label='nav-toggle'
      {...props}>
      <div ref={containerRef} className={styles.itemsRow} style={indicatorStyle}>
        <div className={styles.indicator} aria-hidden />

        <button
          ref={homeRef}
          type='button'
          role='tab'
          aria-selected={value === 'home'}
          className={styles.item({ active: value === 'home' })}
          onClick={() => handleChange('home')}>
          <div className={styles.icon({ active: value === 'home' })}>
            <IcHome />
          </div>
          {value === 'home' && (
            <Text variant='h2' className={styles.label({ active: value === 'home' })}>
              Home
            </Text>
          )}
        </button>

        <button
          ref={listRef}
          type='button'
          role='tab'
          aria-selected={value === 'report'}
          className={styles.item({ active: value === 'report' })}
          onClick={() => handleChange('report')}>
          <div className={styles.icon({ active: value === 'report' })}>
            <IcReport />
          </div>
          {value === 'report' && (
            <Text variant='h2' className={styles.label({ active: value === 'report' })}>
              Report
            </Text>
          )}
        </button>
      </div>
    </div>
  );
};
