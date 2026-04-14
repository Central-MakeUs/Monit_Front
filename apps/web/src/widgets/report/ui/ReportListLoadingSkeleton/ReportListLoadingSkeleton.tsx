'use client';

import React from 'react';
import * as styles from './ReportListLoadingSkeleton.css';

export interface ReportListLoadingSkeletonProps {
  count: number;
}

export const ReportListLoadingSkeleton = ({
  count,
}: ReportListLoadingSkeletonProps): React.JSX.Element => {
  return (
    <section className={styles.yearGroup} aria-busy='true' aria-live='polite'>
      <div className={styles.yearLabel} />
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.body}>
            <div className={styles.badge} />
            <div className={styles.contentBlock}>
              <div className={styles.contentTop} />
              <div className={styles.contentBottom} />
            </div>
          </div>
          <div className={styles.ctaArea}>
            <div className={styles.ctaText} />
          </div>
        </div>
      ))}
    </section>
  );
};
