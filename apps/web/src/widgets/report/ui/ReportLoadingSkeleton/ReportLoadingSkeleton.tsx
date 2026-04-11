'use client';

import React from 'react';
import * as styles from './ReportLoadingSkeleton.css';

export const ReportLoadingSkeleton = (): React.JSX.Element => {
  return (
    <div className={styles.stack} aria-busy='true' aria-live='polite'>
      <div className={styles.overviewCard}>
        <div className={styles.overviewTextBlock}>
          <div className={styles.overviewTopText} />
          <div className={styles.overviewBottomText} />
        </div>
        <div className={styles.overviewChevron} />
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.summaryHeader}>
          <div className={styles.summaryTitleRow}>
            <div className={styles.summaryCardTitle} />
            <div className={styles.summarySubtitleLine1} />
            <div className={styles.summarySubtitleLine2} />
          </div>
          <div className={styles.summaryBadge} />
        </div>

        <div className={styles.summarySection}>
          <div className={styles.summarySectionHeader}>
            <div className={styles.sectionTitle} />
            <div className={styles.sectionAmount} />
          </div>

          <div className={styles.bar} />

          <div className={styles.rankList}>
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.rankItem}>
                <div className={styles.rankItemLeft}>
                  <div className={styles.rankIndex} />
                  <div className={styles.rankDot} />
                  <div className={styles.rankLabel} />
                </div>
                <div className={styles.rankAmount} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.button} />
      </div>
    </div>
  );
};
