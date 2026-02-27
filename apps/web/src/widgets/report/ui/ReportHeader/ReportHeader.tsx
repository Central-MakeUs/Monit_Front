'use client';

import React from 'react';
import { TopBar } from '@/shared/ui/topBar';
import { Text } from '@/shared/ui/text';
import { IcBell, IcSetting } from 'public/icons';
import * as styles from './ReportHeader.css';

export interface ReportHeaderProps {
  onSettingsClick: () => void;
  onNotificationClick: () => void;
}

export const ReportHeader = ({
  onSettingsClick,
  onNotificationClick,
}: ReportHeaderProps): React.JSX.Element => {
  return (
    <TopBar
      left={
        <Text variant='t2' color='default'>
          리포트
        </Text>
      }
      right={
        <div className={styles.headerActions}>
          <button className={styles.iconButton} aria-label='알림' onClick={onNotificationClick}>
            <IcBell />
          </button>
          <button className={styles.iconButton} aria-label='설정' onClick={onSettingsClick}>
            <IcSetting className={styles.settingIc} />
          </button>
        </div>
      }
    />
  );
};
