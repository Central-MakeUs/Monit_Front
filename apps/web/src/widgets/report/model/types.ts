export type RankItem = {
  label: string;
  amount: number;
  count: number;
};

export type ReportSummaryVM = {
  title: string;
  subtitleLines: [string, string];
  periodLabel: string;
  totalAmountText: string;

  barSegments: {
    key: string;
    flex: number;
    colorIndex: 0 | 1 | 2 | 3;
  }[];
  rankRows: {
    key: string;
    index: number;
    dotIndex: 0 | 1 | 2;
    label: string;
    count: number;
    amountText: string;
  }[];
};
