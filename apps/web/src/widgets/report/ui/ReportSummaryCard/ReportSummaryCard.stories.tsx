import type { Meta, StoryObj } from '@storybook/nextjs';
import { ReportSummaryCard } from './ReportSummaryCard';
import { toReportSummaryVM } from '../../model/toReportSummaryVM';
import type { RankItem } from '../../model/types';
import { getFigmaUrl } from '@/shared/config/figma';

const SAMPLE_RANK_ITEMS: RankItem[] = [
  { label: '식비', amount: 320000, count: 12 },
  { label: '교통', amount: 120000, count: 5 },
  { label: '카페/간식', amount: 80000, count: 7 },
  { label: '쇼핑', amount: 60000, count: 3 },
];

const DEFAULT_PARAMS = {
  title: '2026년 1월 1주차',
  periodLabel: '26.01.01 ~ 01.07',
  totalAmount: 580000,
  rankItems: SAMPLE_RANK_ITEMS,
  actionLabel: '리포트 보러가기',
};

const meta: Meta<typeof ReportSummaryCard> = {
  title: 'Widgets/Report/ReportSummaryCard',
  component: ReportSummaryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: getFigmaUrl('5137-72299'),
    },
    docs: {
      description: {
        component: [
          '리포트 요약 카드(프레젠테이션). `vm`(뷰모델)과 `onViewReport`만 받으며, 가공은 `toReportSummaryVM`으로 위/페이지에서 수행합니다.',
          '',
          '## 사용 예',
          '```ts',
          'const vm = toReportSummaryVM({ title, periodLabel, totalAmount, rankItems, actionLabel });',
          '<ReportSummaryCard vm={vm} onViewReport={handleView} />',
          '```',
        ].join('\n'),
      },
    },
  },
  args: {
    vm: toReportSummaryVM(DEFAULT_PARAMS),
    onViewReport: () => {},
  },
  argTypes: {
    vm: {
      control: false,
      description: 'toReportSummaryVM()으로 만든 뷰모델',
      table: {
        type: { summary: 'ReportSummaryVM' },
      },
    },
    onViewReport: {
      action: 'onViewReport',
      description: '리포트 상세 보기 액션',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본',
  args: {
    vm: toReportSummaryVM(DEFAULT_PARAMS),
  },
};

export const WithoutRank: Story = {
  name: '랭킹 없음',
  args: {
    vm: toReportSummaryVM({
      ...DEFAULT_PARAMS,
      totalAmount: 0,
      rankItems: [],
    }),
  },
};

export const SingleRank: Story = {
  name: '랭킹 1개',
  args: {
    vm: toReportSummaryVM({
      ...DEFAULT_PARAMS,
      totalAmount: 320000,
      rankItems: [{ label: '식비', amount: 320000, count: 12 }],
    }),
  },
};

export const ManyRanks: Story = {
  name: '랭킹 많음',
  args: {
    vm: toReportSummaryVM({
      ...DEFAULT_PARAMS,
      totalAmount: 630000,
      rankItems: [
        { label: '식비', amount: 320000, count: 12 },
        { label: '교통', amount: 120000, count: 5 },
        { label: '카페/간식', amount: 80000, count: 7 },
        { label: '쇼핑', amount: 65000, count: 4 },
        { label: '문화/여가', amount: 45000, count: 2 },
      ],
    }),
  },
};

export const CustomSubtitle: Story = {
  name: '커스텀 부제',
  args: {
    vm: toReportSummaryVM({
      ...DEFAULT_PARAMS,
      subtitleLines: ['이번 주에도', '꾸준히 소비했어요'],
    }),
  },
};
