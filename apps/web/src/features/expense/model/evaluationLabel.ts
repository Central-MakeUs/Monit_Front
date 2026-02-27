import type { EvaluationType } from '@/shared/types/evaluation.types';

const EVALUATION_LABEL_MAP: Record<EvaluationType, string> = {
  VERY_SATISFIED: '정말 만족했어요',
  SATISFIED: '만족했어요',
  NORMAL: '그냥 그랬어요',
  DISAPPOINTED: '조금 아쉬웠어요',
  VERY_DISAPPOINTED: '정말 별로였어요',
};

export const getEvaluationLabel = (evaluationType: EvaluationType): string => {
  return EVALUATION_LABEL_MAP[evaluationType];
};
