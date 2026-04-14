export type SatisfactionLevel = 1 | 2 | 3 | 4 | 5;

export type SatisfactionRow = {
  level: SatisfactionLevel;
  label: string;
  count: number;
  totalAmount: number;
};

export type CategoryCardState = 'expanded' | 'collapsed' | 'disabled';

export type ReportCategoryVM = {
  id: string;
  rank: number;
  name: string;
  state: CategoryCardState;
  description: string;
  satisfactionRows: SatisfactionRow[];
  totalCount: number;
  totalAmount: number;
};

export type ReportDetailVM = {
  periodLabel: string;
  subtitleLine: string;
  titleLine: string;
  categories: ReportCategoryVM[];
  totalCount: number;
  totalAmount: number;
  avgSatisfactionComment: string;
};
