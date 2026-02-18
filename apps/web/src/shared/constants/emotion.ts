import { Emotion } from '../types';

export const emotions: readonly Emotion[] = [
  {
    label: '그냥저냥',
    tags: ['#이유 없음', '#무심코'],
    description:
      '딱히 소비해야 할 이유는 없었어요.\n특별한 이유를 찾기보다는 그냥 재밌고 즐겁게 소비했어요.',
  },
  {
    label: '필수템',
    tags: ['#생산성 향상', '#이유 확실'],
    description:
      '내가 하는 일의 효율을 높여줄 확실한 투자예요.\n내가 하려는 일을 더 기분 좋고 완벽하게 시작하기 위해 갖춰야 했어요.',
  },
  {
    label: '홀린듯이',
    tags: ['#이유 없음', '#무계획'],
    description: '처음부터 소비 할 생각은 아니었어요.\n보다가, 누르다 보니 결제가 끝나 있었어요.',
  },
  {
    label: '살기위해',
    tags: ['#현실', '#일상 생활'],
    description:
      '지금의 나를 유지하려면 필요했어요.\n거창한 이유 없이, 일상을 이어가기 위한 소비였어요.',
  },
  {
    label: '기분전환',
    tags: ['#힐링 타임', '#소확행'],
    description: '기분이 가라앉아 있거나 답답했어요.\n스트레스를 풀고 마음을 환기하고 싶었어요.',
  },
] as const;
