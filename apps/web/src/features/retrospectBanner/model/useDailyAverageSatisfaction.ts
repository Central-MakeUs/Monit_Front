import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDailyAverageSatisfaction } from '@/entities/expenseReport';
import type { BannerCompletedRating } from '@/shared/ui/banner';

const mapTextToRating = (text?: string | null): BannerCompletedRating | null => {
  if (!text) return null;
  const normalized = text.replace(/\./g, '').trim();

  switch (normalized) {
    case '정말 만족했어요':
      return 5;
    case '대체로 만족해요':
      return 4;
    case '그냥 그랬어요':
      return 3;
    case '조금 아쉬워요':
      return 2;
    case '별로였어요':
      return 1;
    default:
      return null;
  }
};

interface UseDailyAverageSatisfactionParams {
  /** yyyy-MM-dd 형식의 날짜 문자열 (예: 2026-02-24) */
  date?: string;
  /** 회고 완료 여부 (true일 때만 API 호출) */
  enabled?: boolean;
}

export const useDailyAverageSatisfaction = ({
  date,
  enabled = false,
}: UseDailyAverageSatisfactionParams) => {
  const query = useQuery({
    queryKey: ['dailyAverageSatisfaction', date],
    queryFn: () => getDailyAverageSatisfaction(date!),
    enabled: enabled && !!date,
    staleTime: 5 * 60 * 1000,
  });

  const rating = useMemo<BannerCompletedRating | null>(() => {
    const text = query.data?.result ?? null;
    return mapTextToRating(text);
  }, [query.data?.result]);

  return {
    rating,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
};
