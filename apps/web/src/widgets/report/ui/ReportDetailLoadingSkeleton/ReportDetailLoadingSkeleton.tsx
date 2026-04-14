'use client';

import React from 'react';
import * as styles from './ReportDetailLoadingSkeleton.css';

export const ReportDetailLoadingSkeleton = (): React.JSX.Element => {
  return (
    <div aria-busy='true' aria-live='polite'>
      <div className={styles.summarySection}>
        <div className={styles.badge} />
        <div className={styles.subtitle} />
        <div className={styles.titleLine1} />
        <div className={styles.titleLine2} />
      </div>

      <div className={styles.cardList}>
        <div className={styles.cardExpanded}>
          <div className={styles.expandedHeader}>
            <div className={styles.expandedHeaderLeft}>
              <div className={styles.rankBadge} />
              <div className={styles.categoryName} />
            </div>
            <div className={styles.chevron} />
          </div>

          <div className={styles.expandedBody}>
            <div className={styles.description} />

            <div className={styles.tableSection}>
              <div className={styles.tableHeaderRow}>
                <div className={styles.tableHeaderLabel} />
                <div className={styles.tableRowRight}>
                  <div className={styles.tableHeaderCount} />
                  <div className={styles.tableHeaderAmount} />
                </div>
              </div>

              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.tableRow}>
                  <div className={styles.tableRowLeft}>
                    <div className={styles.tableEmoji} />
                    <div className={styles.tableLabel} />
                  </div>
                  <div className={styles.tableRowRight}>
                    <div className={styles.tableCount} />
                    <div className={styles.tableAmount} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={styles.cardCollapsed}>
            <div className={styles.collapsedHeaderLeft}>
              <div className={styles.rankBadge} />
              <div className={styles.categoryName} />
            </div>
            <div className={styles.chevron} />
          </div>
        ))}
      </div>

      <div className={styles.totalBar}>
        <div className={styles.totalBarLeft} />
        <div className={styles.totalBarRight} />
      </div>

      <div className={styles.avgCard}>
        <div className={styles.avgLabel} />
        <div className={styles.avgComment} />
      </div>
    </div>
  );
};
