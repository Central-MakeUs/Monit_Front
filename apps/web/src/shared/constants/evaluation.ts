/** evaluationType enum → 만족도 레벨 (5=최고, 1=최저) */
export const EVALUATION_TYPE_TO_LEVEL: Record<string, number> = {
  VERY_SATISFIED: 5,
  SATISFIED: 4,
  NORMAL: 3,
  DISAPPOINTED: 2,
  VERY_DISAPPOINTED: 1,
};

/** evaluationType enum → 한국어 레이블 */
export const EVALUATION_TYPE_LABEL: Record<string, string> = {
  VERY_SATISFIED: '정말 만족했어요',
  SATISFIED: '대체로 만족했어요',
  NORMAL: '그냥 그랬어요',
  DISAPPOINTED: '조금 아쉬워요',
  VERY_DISAPPOINTED: '별로였어요',
};

/** API 응답 순서 보장을 위한 정렬 기준 (높은 만족도 → 낮은 만족도) */
export const EVALUATION_TYPE_ORDER = [
  'VERY_SATISFIED',
  'SATISFIED',
  'NORMAL',
  'DISAPPOINTED',
  'VERY_DISAPPOINTED',
] as const;
