'use client';

import React from 'react';
import { Card, Text, Button, vars, Badge } from '@/shared/ui';
import { IcClear } from 'public/icons';
import type { ReportSummaryVM } from '../../model/types';
import * as styles from './ReportSummaryCard.css';

export interface ReportSummaryCardProps {
  vm: ReportSummaryVM;
  onViewReport: () => void;
}

export const ReportSummaryCard = ({
  vm,
  onViewReport,
}: ReportSummaryCardProps): React.JSX.Element => {
  return (
    <Card className={styles.root} role='button' tabIndex={0}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Text variant='h1' color={vars.color.text.secondary}>
            {vm.title}
          </Text>
          <Text variant='t1' className={styles.subtitle}>
            {vm.subtitleLines[0]}
            <br />
            {vm.subtitleLines[1]}
          </Text>
        </div>
        <div className={styles.badgeWrapper}>
          <Badge label={vm.periodLabel} size='xs' />
        </div>
      </div>

      {vm.rankRows.length > 0 && (
        <section className={styles.rankSection} aria-label='총 소비 현황'>
          <div className={styles.summaryHeader}>
            <Text variant='h1' color={vars.color.text.secondary}>
              총 소비 현황
            </Text>
            <div className={styles.summaryTitleRow}>
              <Text variant='h4' color={vars.color.text.primary}>
                {vm.totalAmountText}
              </Text>
            </div>
          </div>

          {vm.barSegments.length > 0 && (
            <div className={styles.barTrack} role='img' aria-label='금액 비율 막대'>
              {vm.barSegments.map((seg) => (
                <div
                  key={seg.key}
                  className={styles.barSegment[seg.colorIndex]}
                  style={{ width: `${seg.flex * 100}%` }}
                />
              ))}
            </div>
          )}

          <ol className={styles.rankList}>
            {vm.rankRows.map((row) => (
              <li key={row.key} className={styles.rankItem}>
                <div className={styles.rankLabel}>
                  <div className={styles.rankIndex}>
                    <Text variant='b3' color={vars.color.text.tertiary}>
                      {row.index}
                    </Text>
                  </div>
                  <span className={styles.rankDot[row.dotIndex]} />
                  <div className={styles.rankLabelTextWrapper}>
                    <p className={styles.rankLabelText}>{row.label}</p>
                    <IcClear className={styles.rankCountIcon} aria-hidden />
                    <p className={styles.rankLabelText}>{row.count}</p>
                  </div>
                </div>
                <p className={styles.countLabelText}>총 {row.amountText}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className={styles.footer}>
        <Button
          size='md'
          variant='white'
          onClick={(e) => {
            e.stopPropagation();
            onViewReport();
          }}>
          리포트 확인하기
        </Button>
      </div>
    </Card>
  );
};
