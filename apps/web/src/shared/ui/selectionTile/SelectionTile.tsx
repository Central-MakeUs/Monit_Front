'use client';

import React from 'react';
import { IcCheck, IcRightChevron } from 'public/icons';
import * as styles from './SelectionTile.css';
import { Text } from '../text';
import { useBridge } from '@/shared/lib/bridge';

export interface SelectionTileProps {
  size?: 'lg' | 'sm';
  selected?: boolean;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}

export const SelectionTile = ({
  size = 'lg',
  selected = false,
  label,
  onClick,
  disabled = false,
  href,
}: SelectionTileProps) => {
  const bridge = useBridge();
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleExternalUrl = (href: string) => {
    bridge?.openExternalUrl(href);
  };

  if (size === 'sm') {
    return (
      <div
        className={styles.container({ size: 'sm' })}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role='checkbox'
        aria-checked={selected}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}>
        <div className={styles.content}>
          <div className={styles.checkIcon({ selected })}>
            <IcCheck />
          </div>
          <Text variant='b4'>{label}</Text>
        </div>
        {href && !disabled ? (
          <button
            className={styles.chevronIcon()}
            onClick={(e) => {
              e.stopPropagation();
              handleExternalUrl(href);
            }}>
            <IcRightChevron />
          </button>
        ) : (
          <div className={styles.chevronIcon()}>
            <IcRightChevron />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={styles.container({ size: 'lg' })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role='checkbox'
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}>
      <div className={styles.checkIcon({ selected })}>
        <IcCheck />
      </div>
      <Text variant='h4'>{label}</Text>
    </div>
  );
};
