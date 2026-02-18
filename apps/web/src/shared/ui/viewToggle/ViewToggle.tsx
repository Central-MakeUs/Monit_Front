'use client';

import React, { useState } from 'react';
import * as styles from './ViewToggle.css';
import { useToggleIndicator } from '../../hooks/useToggleIndicator';
import { IcWeek, IcMonth } from 'public/icons';

export type ViewToggleOption = 'list' | 'calendar';

export interface ViewToggleProps {
  value?: ViewToggleOption;
  defaultValue?: ViewToggleOption;
  onChange?: (value: ViewToggleOption) => void;
  disabled?: boolean;
  ariaLabel?: string;
}

export const ViewToggle = ({
  value: controlledValue,
  defaultValue = 'list',
  onChange,
  disabled = false,
  ariaLabel = 'view-ViewToggle',
}: ViewToggleProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<ViewToggleOption>(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const {
    containerRef,
    firstRef: listRef,
    secondRef: calendarRef,
    indicatorStyle,
  } = useToggleIndicator({
    activeIndex: value === 'list' ? 0 : 1,
    styleVars: { x: styles.indicatorXVar, width: styles.indicatorWVar },
  });

  const handleChange = (newValue: ViewToggleOption) => {
    if (disabled || newValue === value) return;

    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div className={styles.container} role='ViewToggle' aria-label={ariaLabel}>
      <div className={styles.indicator} style={indicatorStyle} aria-hidden />

      <div ref={containerRef} className={styles.itemsRow}>
        <button
          ref={listRef}
          type='button'
          role='radio'
          aria-checked={value === 'list'}
          disabled={disabled}
          className={styles.item}
          onClick={() => handleChange('list')}>
          <div className={styles.icon({ active: value === 'list' })}>
            <IcWeek />
          </div>
        </button>

        <button
          ref={calendarRef}
          type='button'
          role='radio'
          aria-checked={value === 'calendar'}
          disabled={disabled}
          className={styles.item}
          onClick={() => handleChange('calendar')}>
          <div className={styles.icon({ active: value === 'calendar' })}>
            <IcMonth />
          </div>
        </button>
      </div>
    </div>
  );
};
