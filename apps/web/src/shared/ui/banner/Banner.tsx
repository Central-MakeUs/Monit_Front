'use client';

import React, { HTMLAttributes } from 'react';
import * as styles from './Banner.css';
import { Text } from '../text';
import { vars } from '../theme.css';
import { IcPercent, IcRightChevron } from 'public/icons';

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** 활성 상태 여부 (회고할 건수가 있는지) */
  isActive?: boolean;
  /** 돌아보지 않은 소비 건수 (isActive가 true일 때 사용) */
  count?: number;
  /** 메인 타이틀 (isActive가 false일 때 표시) */
  title?: string;
  /** 서브 텍스트 (isActive가 false일 때 표시) */
  subText?: string;
  /** 돌아보기 버튼 클릭 핸들러 */
  onClickReview?: () => void;
}

export const Banner = ({
  isActive = false,
  count = 0,
  title: titleProp,
  subText: subTextProp,
  onClickReview,
  ...props
}: BannerProps) => {
  const title = isActive
    ? '지난 소비, 지금은 어떻게 느끼나요?'
    : (titleProp ?? '이번주는 대체적으로 만족했어요');

  const subText = isActive
    ? `아직 돌아보지 않은 소비 ${count}건`
    : (subTextProp ?? '회고를 전부 완료했어요');

  return (
    <div className={styles.bannerWrapper} {...props}>
      <div className={styles.contentWrapper}>
        <div className={styles.iconWrapper}>
          <IcPercent className={styles.iconInner} />
        </div>
        <div className={styles.textWrapper}>
          <Text variant='b3' color={vars.color.text.primary}>
            {title}
          </Text>
          <Text variant='b1' color={vars.color.text.tertiary}>
            {subText}
          </Text>
        </div>
      </div>
      <button
        className={styles.bannerButton({ active: isActive })}
        onClick={isActive ? onClickReview : undefined}
        disabled={!isActive}
        type='button'>
        <Text variant='b1' color={isActive ? vars.color.text.onBrand : vars.color.text.onDisabled}>
          돌아보기
        </Text>
        <IcRightChevron className={styles.buttonIcon} />
      </button>
    </div>
  );
};
