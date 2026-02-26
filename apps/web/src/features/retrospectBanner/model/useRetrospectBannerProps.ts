import { useMemo } from 'react';

type UseRetrospectBannerPropsParams = {
  selectedDate: Date | null;
  dailyDate?: string;
  hasExpenses: boolean;
  retrospectCompleted?: boolean;
  bannerMessage?: string | null;
  bannerSubMessage?: string | null;
};

type BannerProps =
  | {
      isActive: false;
      hasSpending?: boolean;
      title?: string;
      subText?: string;
      dateLabel?: string;
    }
  | {
      isActive: true;
      hasSpending?: boolean;
      title: string;
      subText?: string;
      dateLabel?: string;
    };

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatDateLabel = (date: Date) => `${date.getMonth() + 1}월 ${date.getDate()}일`;

/**
 * 홈 배너에 내려줄 props를 계산하는 도메인 정책 훅
 */
export const useRetrospectBannerProps = ({
  selectedDate,
  dailyDate,
  hasExpenses,
  retrospectCompleted,
  bannerMessage,
  bannerSubMessage,
}: UseRetrospectBannerPropsParams): BannerProps =>
  useMemo(() => {
    const today = new Date();
    const baseDate = dailyDate ? new Date(dailyDate) : (selectedDate ?? today);

    const isToday = isSameDay(baseDate, today);
    const dateLabel = formatDateLabel(baseDate);

    // 오늘인 경우: Banner의 today 기본 카피를 그대로 사용
    if (isToday) {
      return { isActive: false };
    }

    // 오늘이 아니고, 소비가 전혀 없는 경우
    if (!hasExpenses) {
      return {
        isActive: false,
        hasSpending: false,
        title: `${dateLabel}의 소비가 남겨지지 않았어요`,
        subText: '소비를 기록한 뒤 만족도를 남겨보세요',
        dateLabel,
      };
    }

    // 오늘이 아니고, 소비가 있는 경우 → API에서 내려준 카피 사용
    return {
      isActive: !retrospectCompleted,
      title: bannerMessage ?? `${dateLabel}의 소비, 지금은 어떤가요?`,
      subText: bannerSubMessage ?? undefined,
      dateLabel,
    };
  }, [selectedDate, dailyDate, hasExpenses, retrospectCompleted, bannerMessage, bannerSubMessage]);
