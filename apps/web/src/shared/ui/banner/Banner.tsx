'use client';

import React, { HTMLAttributes } from 'react';
import * as styles from './Banner.css';
import { Text } from '../text';
import { vars } from '../theme.css';
import {
  IcRightChevron,
  IcGrayNormal,
  IcVeryDisappointed,
  IcDisappointed,
  IcNormal,
  IcSatisfied,
  IcVerySatisfied,
} from 'public/icons';

export type BannerCompletedRating = 1 | 2 | 3 | 4 | 5;

type BannerIconState = 'today' | 'success1' | 'success2' | 'success3' | 'success4' | 'success5';

const SUCCESS_TITLES: Record<BannerCompletedRating, string> = {
  1: '별로인 소비였어요',
  2: '조금 아쉬운 소비였어요',
  3: '그냥 그랬던 소비였어요',
  4: '대체로 만족한 소비였어요',
  5: '정말 만족한 소비였어요',
};

const SUCCESS_SUBTEXT = '모든 회고를 완료했어요';

const EMOJI_ICONS = {
  1: IcVeryDisappointed,
  2: IcDisappointed,
  3: IcNormal,
  4: IcSatisfied,
  5: IcVerySatisfied,
} as const;

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** 활성 상태 여부 (회고할 건수가 있는지) */
  isActive?: boolean;
  /** 해당 날짜에 소비 기록이 있는지 (false이면 '소비가 남겨지지 않았어요' 상태, 돌아보기 비활성) */
  hasSpending?: boolean;
  /** 돌아보지 않은 소비 건수 (isActive가 true일 때 사용) */
  count?: number;
  /** 회고 완료 후 만족도 1~5 (설정 시 success 배너로 표시, 버튼 숨김) */
  completedRating?: BannerCompletedRating;
  /** 메인 타이틀 (today/active/noSpending 시 오버라이드용) */
  title?: string;
  /** 서브 텍스트 (today/active/noSpending 시 오버라이드용) */
  subText?: string;
  /** 날짜 라벨: active일 때 "N월 N일의 소비, 지금은 어떤가요?", noSpending일 때 "N월 N일의 소비가 남겨지지 않았어요" */
  dateLabel?: string;
  /** 돌아보기 버튼 클릭 핸들러 */
  onClickReview?: () => void;
}

const NO_SPENDING_SUBTEXT = '소비를 기록한 뒤 만족도를 남겨보세요';

export const Banner = ({
  isActive = false,
  hasSpending = true,
  count = 0,
  completedRating,
  title: titleProp,
  subText: subTextProp,
  dateLabel,
  onClickReview,
  ...props
}: BannerProps) => {
  const isSuccess = completedRating != null && completedRating >= 1 && completedRating <= 5;

  let title: string;
  let subText: string;
  let iconWrapperState: BannerIconState = 'today';
  let buttonVariant: 'disabled' | 'active' | 'hidden';

  if (isSuccess) {
    title = SUCCESS_TITLES[completedRating!];
    subText = SUCCESS_SUBTEXT;
    iconWrapperState = `success${completedRating}` as BannerIconState;
    buttonVariant = 'hidden';
  } else if (isActive) {
    title =
      titleProp ??
      (dateLabel ? `${dateLabel}의 소비, 지금은 어떤가요?` : '지난 소비, 지금은 어떻게 느끼나요?');
    subText = subTextProp ?? `아직 돌아보지 않은 소비 ${count}건`;
    buttonVariant = 'active';
  } else if (hasSpending === false && dateLabel) {
    title = titleProp ?? `${dateLabel}의 소비가 남겨지지 않았어요`;
    subText = subTextProp ?? NO_SPENDING_SUBTEXT;
    iconWrapperState = 'today';
    buttonVariant = 'disabled';
  } else {
    title = titleProp ?? '오늘의 소비는 내일 돌아볼 수 있어요';
    subText = subTextProp ?? '5단계로 만족도를 남겨볼 수 있어요';
    iconWrapperState = 'today';
    buttonVariant = 'disabled';
  }

  const EmojiIcon = isSuccess ? EMOJI_ICONS[completedRating!] : IcGrayNormal;

  return (
    <div className={styles.bannerWrapper} {...props}>
      <div className={styles.contentWrapper}>
        <div className={styles.iconWrapper({ state: iconWrapperState })}>
          <EmojiIcon className={styles.emojiIcon} />
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
        className={styles.bannerButton({ variant: buttonVariant })}
        onClick={buttonVariant === 'active' ? onClickReview : undefined}
        disabled={buttonVariant !== 'active'}
        type='button'>
        <Text
          variant='b1'
          color={buttonVariant === 'active' ? vars.color.text.onBrand : vars.color.text.onDisabled}>
          돌아보기
        </Text>
        {buttonVariant === 'active' && <IcRightChevron className={styles.buttonIcon} />}
      </button>
    </div>
  );
};
