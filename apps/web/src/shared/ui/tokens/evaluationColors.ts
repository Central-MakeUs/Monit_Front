import { primitiveColors } from '../theme.css';
import type { EvaluationType } from '@/shared/types/evaluation.types';

export const EVALUATION_COLOR_MAP: Record<
  EvaluationType,
  { bg: string; border: string; text: string }
> = {
  VERY_SATISFIED: {
    bg: primitiveColors.blue[100],
    border: primitiveColors.blue[200],
    text: primitiveColors.blue[400],
  },
  SATISFIED: {
    bg: primitiveColors.green[50],
    border: primitiveColors.green[100],
    text: primitiveColors.green[300],
  },
  NORMAL: {
    bg: primitiveColors.yellow[50],
    border: primitiveColors.yellow[100],
    text: primitiveColors.yellow[500],
  },
  DISAPPOINTED: {
    bg: primitiveColors.primary[50],
    border: primitiveColors.primary[100],
    text: primitiveColors.primary[400],
  },
  VERY_DISAPPOINTED: {
    bg: primitiveColors.red[50],
    border: primitiveColors.red[100],
    text: primitiveColors.red[400],
  },
};
