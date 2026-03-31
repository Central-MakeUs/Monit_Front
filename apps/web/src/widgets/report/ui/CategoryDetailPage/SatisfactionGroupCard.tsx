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

// ─── Transaction row ───────────────────────────────────────────────────────
// Page-native row: icon + merchant/category text + amount.
// No satisfaction badge — that information belongs to the section header above.

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

// ─── Satisfaction group section ────────────────────────────────────────────
// Full-width white panel (no rounded corners), matching Figma "report card"

interface SatisfactionGroupCardProps {
  vm: CategoryDetailGroupVM;
}

export const SatisfactionGroupCard = ({ vm }: SatisfactionGroupCardProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.section}>
      {/* Section header: rank badge + satisfaction label + chevron */}
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
          {/* Count + subtotal sub-header */}
          <div className={styles.listHeader}>
            <span className={styles.listHeaderCount}>{vm.totalCount}건의 소비</span>
            <span className={styles.listHeaderAmount}>총 {formatCurrency(vm.totalAmount)}</span>
          </div>

          {/* Divider inset 18px each side → 354px effective on 390px screen */}
          <div className={styles.dividerWrapper}>
            <Divider color={primitiveColors.gray[100]} />
          </div>

          {/* Transaction rows — no badge; satisfaction info lives in section header above */}
          {vm.transactions.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </div>
      )}
    </div>
  );
};
