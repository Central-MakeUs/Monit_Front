import type { Meta, StoryObj } from '@storybook/nextjs';
import { StepIndicator } from './StepIndicator';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Components/StepIndicator',
  component: StepIndicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: getFigmaUrl('434-6388'),
    },
    docs: {
      description: {
        component: [
          ' `소비기록` 작성 시 사용합니다. StepIndicator는 다단계 프로세스에서 사용자의 현재 진행 상태를 시각적으로 표시하는 프로그레스 인디케이터입니다. ',
          '',
          '## 주요 기능',
          '- **currentStep**: 현재 완료된 단계 수 (0부터 시작, 0 = 시작 전)',
          '- **totalSteps**: 전체 단계 수 (기본값: 3)',
          '- currentStep보다 작은 인덱스의 단계는 활성(active) 상태로 표시됩니다.',
          '- 각 단계 바는 flex: 1로 동일한 너비를 가지며, 컨테이너 너비에 맞춰 자동으로 조절됩니다.',
          '',
          '## 사용 예시',
          '```tsx',
          '<StepIndicator currentStep={1} totalSteps={3} />',
          '',
          '```',
        ].join('\n'),
      },
    },
  },
  args: {
    currentStep: 1,
    totalSteps: 3,
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0, max: 10 },
      description: '현재 진행 중인 단계 (0 = 시작 전, 1 = 첫 번째 단계 완료)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    totalSteps: {
      control: { type: 'number', min: 2, max: 10 },
      description: '전체 단계 수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
  },
} satisfies Meta<typeof StepIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
  name: '0단계 시작 전',
  args: {
    currentStep: 0,
    totalSteps: 3,
  },
};

export const Step1: Story = {
  name: '1단계 완료',
  args: {
    currentStep: 1,
    totalSteps: 3,
  },
};

export const Step2: Story = {
  name: '2단계 완료',
  args: {
    currentStep: 2,
    totalSteps: 3,
  },
};

export const Step3: Story = {
  name: '3단계 완료',
  args: {
    currentStep: 3,
    totalSteps: 3,
  },
};

export const AllSteps: Story = {
  name: 'All steps comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '20px' }}>
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
          Step 0 - 시작
        </h3>
        <StepIndicator currentStep={0} totalSteps={3} />
        <p style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>작성 시작 전 초기 상태</p>
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
          Step 1 - 금액 입력 완료
        </h3>
        <StepIndicator currentStep={1} totalSteps={3} />
        <p style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>첫 번째 단계 완료</p>
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
          Step 2 - 카테고리 선택 완료
        </h3>
        <StepIndicator currentStep={2} totalSteps={3} />
        <p style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>두 번째 단계 완료</p>
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
          Step 3 - 최종 확인
        </h3>
        <StepIndicator currentStep={3} totalSteps={3} />
        <p style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>
          모든 단계 완료, 제출 준비 상태
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '3단계 프로세스의 전체 흐름을 한눈에 볼 수 있습니다. 0단계(시작)부터 3단계(완료)까지의 모든 상태를 표시합니다.',
      },
    },
  },
};
