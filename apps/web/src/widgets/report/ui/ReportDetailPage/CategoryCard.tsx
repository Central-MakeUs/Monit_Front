'use client';

import React, { useState } from 'react';
import { Divider } from '@/shared/ui';
import {
  IcRightChevron,
  IcVerySatisfied,
  IcSatisfied,
  IcNormal,
  IcDisappointed,
  IcVeryDisappointed,
  IcGrayVerySatisfied,
  IcGraySatisfied,
  IcGrayNormal,
  IcGrayDisappointed,
  IcGrayVeryDisappointed,
} from 'public/icons';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import type { ReportCategoryVM, SatisfactionLevel } from '../../model/reportDetailTypes';
import * as styles from './CategoryCard.css';

interface CategoryCardProps {
  vm: ReportCategoryVM;
  onViewDetail?: (id: string) => void;
}

const EMOJI_ACTIVE: Record<SatisfactionLevel, React.FC<React.SVGProps<SVGSVGElement>>> = {
  5: IcVerySatisfied,
  4: IcSatisfied,
  3: IcNormal,
  2: IcDisappointed,
  1: IcVeryDisappointed,
};

const EMOJI_GRAY: Record<SatisfactionLevel, React.FC<React.SVGProps<SVGSVGElement>>> = {
  5: IcGrayVerySatisfied,
  4: IcGraySatisfied,
  3: IcGrayNormal,
  2: IcGrayDisappointed,
  1: IcGrayVeryDisappointed,
};

export const CategoryCard = ({ vm, onViewDetail }: CategoryCardProps) => {
  const [isOpen, setIsOpen] = useState(vm.state === 'expanded');
  const isDisabled = vm.state === 'disabled';
  const hasData = vm.satisfactionRows.length > 0;

  const handleHeaderClick = () => {
    if (isDisabled) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={isDisabled ? styles.cardDisabled : styles.cardDefault}>
      <div
        className={isDisabled ? styles.headerDisabled : styles.header}
        onClick={handleHeaderClick}
        role={isDisabled ? undefined : 'button'}
        aria-expanded={isDisabled ? undefined : isOpen}
        tabIndex={isDisabled ? undefined : 0}
        onKeyDown={(e) => {
          if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleHeaderClick();
          }
        }}>
        <div className={isDisabled ? styles.headerLeftRow : styles.headerLeft}>
          <div className={isDisabled ? styles.rankBadgeDisabled : styles.rankBadgeActive}>
            <span className={styles.rankText}>{vm.rank}</span>
          </div>
          <span className={isDisabled ? styles.categoryNameDisabled : styles.categoryName}>
            {vm.name}
          </span>
        </div>
        {isDisabled ? (
          <span className={styles.noDataText}>소비 내역이 없어요</span>
        ) : (
          <IcRightChevron
            className={isOpen ? styles.chevronOpen : styles.chevronClosed}
            aria-hidden
          />
        )}
      </div>

      {isOpen && !isDisabled && (
        <div className={styles.body}>
          {vm.description && <p className={styles.description}>{vm.description}</p>}

          <div className={styles.tableSection}>
            {hasData && (
              <>
                {/* Column header */}
                <div className={styles.tableHeaderRow}>
                  <span className={styles.tableHeaderLabel}>만족도</span>
                  <div className={styles.tableHeaderRight}>
                    <span className={styles.tableHeaderCount}>개수</span>
                    <span className={styles.tableHeaderAmount}>총 금액</span>
                  </div>
                </div>

                <Divider />
              </>
            )}

            {/* Data rows */}
            {hasData &&
              vm.satisfactionRows.map((row) => {
                const rowDisabled = row.count === 0;
                const EmojiIcon = rowDisabled ? EMOJI_GRAY[row.level] : EMOJI_ACTIVE[row.level];
                return (
                  <div key={row.level} className={styles.tableRow}>
                    <div className={styles.rowLeft}>
                      <EmojiIcon className={styles.emoji} aria-hidden />
                      <span className={styles.satisfactionLabel}>{row.label}</span>
                    </div>
                    <div className={styles.rowRight}>
                      <span className={styles.rowCount}>{row.count}</span>
                      <span className={styles.rowAmount}>{formatCurrency(row.totalAmount)}</span>
                    </div>
                  </div>
                );
              })}

            {hasData && <Divider />}

            <div className={styles.bottomSection}>
              <div className={styles.totalRow}>
                <span className={styles.totalCountText}>총 소비 {vm.totalCount}건</span>
                <div className={styles.totalAmountWrapper}>
                  <span className={styles.totalAmountLabel}>총</span>
                  <span className={styles.totalAmountLabel}>{formatCurrency(vm.totalAmount)}</span>
                </div>
              </div>

              <div className={styles.viewDetailRow}>
                <span
                  className={styles.viewDetailText}
                  role={onViewDetail ? 'button' : undefined}
                  tabIndex={onViewDetail ? 0 : undefined}
                  onClick={(e) => {
                    if (!onViewDetail) return;
                    e.stopPropagation();
                    onViewDetail(vm.id);
                  }}
                  onKeyDown={(e) => {
                    if (!onViewDetail) return;
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onViewDetail(vm.id);
                    }
                  }}>
                  상세 보기
                </span>
                <IcRightChevron className={styles.viewDetailIcon} aria-hidden />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
