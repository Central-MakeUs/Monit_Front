'use client';

import React, { useState } from 'react';
import { Divider } from '@/shared/ui';
import { primitiveColors } from '@/shared/ui/theme.css';
import { IcRightChevron } from 'public/icons';
import { CATEGORY_ICON_MAP } from '@/shared/ui/categoryBtn/categoryIcons';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import type {
  CategoryDetailGroupVM,
  CategoryDetailTransactionVM,
} from '../../model/categoryDetailTypes';
import * as styles from './SatisfactionGroupCard.css';

const TransactionRow = ({ tx }: { tx: CategoryDetailTransactionVM }) => {
  const { component: IconComponent, color } = CATEGORY_ICON_MAP[tx.categoryIcon];

  return (
    <div className={styles.transactionRow}>
      <div className={styles.rowLeft}>
        <div className={styles.iconBox} style={{ color }}>
          <IconComponent className={styles.iconSvg} />
        </div>
        <div className={styles.textGroup}>
          <span className={styles.merchantName}>{tx.merchantName}</span>
          <span className={styles.categoryText}>{tx.categoryName}</span>
        </div>
      </div>
      <span className={styles.amount}>{formatCurrency(tx.amount)}</span>
    </div>
  );
};

interface SatisfactionGroupCardProps {
  vm: CategoryDetailGroupVM;
}

export const SatisfactionGroupCard = ({ vm }: SatisfactionGroupCardProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.section}>
      <div
        className={styles.sectionHeader}
        onClick={() => setIsOpen((prev) => !prev)}
        role='button'
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}>
        <div className={styles.sectionHeaderLeft}>
          <div className={styles.rankBadge}>
            <span className={styles.rankText}>{vm.rank}</span>
          </div>
          <span className={styles.sectionLabel}>{vm.label}</span>
        </div>
        <IcRightChevron
          className={isOpen ? styles.chevronOpen : styles.chevronClosed}
          aria-hidden
        />
      </div>

      {isOpen && (
        <div className={styles.sectionBody}>
          <div className={styles.listHeader}>
            <span className={styles.listHeaderCount}>{vm.totalCount}건의 소비</span>
            <span className={styles.listHeaderAmount}>총 {formatCurrency(vm.totalAmount)}</span>
          </div>

          <div className={styles.dividerWrapper}>
            <Divider color={primitiveColors.gray[100]} />
          </div>

          {vm.transactions.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </div>
      )}
    </div>
  );
};
