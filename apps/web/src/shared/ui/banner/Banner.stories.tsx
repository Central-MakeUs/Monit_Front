import type { Meta, StoryObj } from '@storybook/nextjs';
import { Banner } from './Banner';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: getFigmaUrl('396-5116'),
    },
    docs: {
      description: {
        component: [
          '회고 현황을 표시하는 배너 컴포넌트입니다. Figma 7종 디자인 지원.',
          '',
          '## 상태',
          '- **today**: 오늘 소비 내일 돌아봄, 5단계 만족도 안내',
          '- **noSpending**: 다른 날인데 소비 기록 없음 → 돌아보기 비활성',
          '- **active**: 날짜+소비 문구, N건 미회고, 돌아보기 버튼 활성',
          '- **success (completedRating 1~5)**: 만족도별 문구, 컬러 이모지, 버튼 숨김',
          '',
          '## 주요 props',
          '- **isActive**: 회고할 건수가 있는지',
          '- **hasSpending**: 해당 날짜에 소비 기록이 있는지 (false면 noSpending 상태)',
          '- **count**: 돌아보지 않은 소비 건수',
          '- **completedRating**: 1~5 만족도 (설정 시 success 배너)',
          '- **dateLabel**: active/noSpending일 때 제목용 날짜',
          '- **onClickReview**: 돌아보기 클릭 핸들러',
          '',
          '## 사용 예시',
          '```tsx',
          '<Banner isActive={true} count={9} dateLabel="12월 31일" onClickReview={() => {}} />',
          '<Banner hasSpending={false} dateLabel="1월 29일" />',
          '<Banner completedRating={5} />',
          '```',
        ].join('\n'),
      },
    },
  },
  args: {
    isActive: false,
    count: 0,
  },
  argTypes: {
    isActive: {
      control: { type: 'boolean' },
      description: '활성 상태 여부 (회고할 건수가 있는지)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hasSpending: {
      control: { type: 'boolean' },
      description: '해당 날짜에 소비 기록이 있는지 (false면 소비 없음 상태)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    count: {
      control: { type: 'number' },
      description: '돌아보지 않은 소비 건수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    completedRating: {
      control: { type: 'number', min: 1, max: 5, step: 1 },
      description: '회고 완료 만족도 1~5 (success 배너)',
      table: {
        type: { summary: '1 | 2 | 3 | 4 | 5' },
      },
    },
    dateLabel: {
      control: { type: 'text' },
      description: 'active일 때 제목에 넣을 날짜 (예: 12월 31일)',
      table: {
        type: { summary: 'string' },
      },
    },
    onClickReview: {
      action: 'clicked',
      description: '돌아보기 버튼 클릭 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Today: Story = {
  name: '1. Today (오늘 소비 내일 돌아봄)',
  args: {
    isActive: false,
  },
  parameters: { design: { url: getFigmaUrl('396-5089') } },
};

export const NoSpending: Story = {
  name: '2. NoSpending (다른 날, 소비 기록 없음)',
  args: {
    hasSpending: false,
    dateLabel: '1월 29일',
  },
  parameters: { design: { url: getFigmaUrl('5150-81350') } },
};

export const Active: Story = {
  name: '3. Active (회고할 건수 있음)',
  args: {
    isActive: true,
    count: 2,
    dateLabel: '12월 31일',
  },
  parameters: { design: { url: getFigmaUrl('396-5117') } },
};

export const Success1: Story = {
  name: '4. Success - 별로인 소비',
  args: { completedRating: 1 },
  parameters: { design: { url: getFigmaUrl('3347-35348') } },
};

export const Success2: Story = {
  name: '5. Success - 조금 아쉬운 소비',
  args: { completedRating: 2 },
  parameters: { design: { url: getFigmaUrl('3347-42086') } },
};

export const Success3: Story = {
  name: '6. Success - 그냥 그랬던 소비',
  args: { completedRating: 3 },
  parameters: { design: { url: getFigmaUrl('3347-42113') } },
};

export const Success4: Story = {
  name: '7. Success - 대체로 만족한 소비',
  args: { completedRating: 4 },
  parameters: { design: { url: getFigmaUrl('3347-42140') } },
};

export const Success5: Story = {
  name: '8. Success - 정말 만족한 소비',
  args: { completedRating: 5 },
  parameters: { design: { url: getFigmaUrl('3347-42167') } },
};

export const Comparison: Story = {
  name: '상태 비교',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3
          style={{
            marginBottom: '8px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
          Today
        </h3>
        <Banner isActive={false} />
      </div>
      <div>
        <h3
          style={{
            marginBottom: '8px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
          NoSpending (다른 날, 소비 없음)
        </h3>
        <Banner hasSpending={false} dateLabel='1월 29일' />
      </div>
      <div>
        <h3
          style={{
            marginBottom: '8px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
          Active
        </h3>
        <Banner
          isActive={true}
          count={2}
          dateLabel='12월 31일'
          onClickReview={() => alert('돌아보기 클릭!')}
        />
      </div>
      <div>
        <h3
          style={{
            marginBottom: '8px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
          Success (만족도 5)
        </h3>
        <Banner completedRating={5} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Today / NoSpending / Active / Success 상태를 한눈에 비교할 수 있습니다.',
      },
    },
  },
};
