import type { components } from '@/shared/api/schema';

export type EvaluationType = NonNullable<
  components['schemas']['EvaluationSummary']['evaluationType']
>;
