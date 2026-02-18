import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { BottomSheet } from '@/shared/ui/bottomSheet';
import { Button } from '@/shared/ui';
import { ExpenseFormBottomSheet } from './ExpenseFormBottomSheet';
import { useModal } from '@/shared/hooks';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Components/BottomSheet/ExpenseFormBottomSheet',
  component: ExpenseFormBottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: getFigmaUrl('1347-6824'),
    },
    docs: {
      description: {
        component: [
          'ExpenseFormBottomSheet는 소비 기록을 입력하고 편집하는 바텀시트 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **소비금액**: EditableTextInput을 사용하여 금액을 입력합니다.',
          '- **사용처**: TextInput을 사용하여 사용처를 입력합니다.',
          '- **소비일**: 날짜를 선택할 수 있는 버튼을 제공합니다.',
          '- **카테고리**: CategoryGrid를 사용하여 카테고리를 선택합니다.',
          '- **감정 정보**: InfoSection을 통해 소비 감정과 만족도를 표시합니다.',
          '- **삭제 버튼**: 기존 소비 기록을 삭제할 수 있습니다.',
          '',
          '## 사용 예시',
          '```tsx',
          'const [amount, setAmount] = useState(0);',
          'const [usage, setUsage] = useState("");',
          'const [selectedDate, setSelectedDate] = useState(new Date());',
          'const [selectedCategoryId, setSelectedCategoryId] = useState(null);',
          '',
          '<ExpenseFormBottomSheet',
          '  amount={amount}',
          '  onAmountChange={setAmount}',
          '  usage={usage}',
          '  onUsageChange={setUsage}',
          '  selectedDate={selectedDate}',
          '  onDateClick={() => {}}',
          '  selectedCategoryId={selectedCategoryId}',
          '  onCategorySelect={(category) => setSelectedCategoryId(category.id)}',
          '  onConfirm={() => {}}',
          '  onClose={() => {}}',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    amount: {
      control: 'number',
      description: '소비 금액',
      table: {
        type: { summary: 'number' },
      },
    },
    onAmountChange: {
      description: '소비 금액 변경 콜백',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    usage: {
      control: 'text',
      description: '사용처',
      table: {
        type: { summary: 'string' },
      },
    },
    onUsageChange: {
      description: '사용처 변경 콜백',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    selectedDate: {
      control: 'date',
      description: '선택된 날짜',
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: 'new Date()' },
      },
    },
    onDateClick: {
      description: '날짜 선택 클릭 콜백',
      table: {
        type: { summary: '() => void' },
      },
    },
    selectedCategoryId: {
      control: 'text',
      description: '선택된 카테고리 ID',
      table: {
        type: { summary: 'string | null' },
      },
    },
    onCategorySelect: {
      description: '카테고리 선택 시 콜백',
      table: {
        type: { summary: '(category: Category) => void' },
      },
    },
    onDelete: {
      description: '삭제 버튼 클릭 시 콜백',
      table: {
        type: { summary: '() => void' },
      },
    },
    onConfirm: {
      description: '확인 버튼 클릭 시 콜백',
      table: {
        type: { summary: '() => void' },
      },
    },
    onClose: {
      description: '닫기 버튼 클릭 시 콜백',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} satisfies Meta<typeof ExpenseFormBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 소비 입력',
  render: () => {
    const TemplateDemo = () => {
      const { isOpen, openModal, closeModal } = useModal();
      const [amount, setAmount] = useState<number>(23000);
      const [usage, setUsage] = useState<string>('');
      const [selectedDate] = useState<Date>(new Date(2026, 0, 25));
      const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>('3');

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
          <Button variant='brand' onClick={openModal}>
            소비 입력 열기
          </Button>

          <BottomSheet isOpen={isOpen} onClose={closeModal}>
            <ExpenseFormBottomSheet
              amount={amount}
              onAmountChange={(value) => setAmount(Number(value))}
              usage={usage}
              onUsageChange={setUsage}
              selectedDate={selectedDate}
              onDateClick={() => alert('날짜 선택')}
              selectedCategoryId={selectedCategoryId}
              onCategorySelect={(category) => setSelectedCategoryId(category.id)}
              onMoreCategoryClick={() => alert('더보기 클릭')}
              satisfactionLabel='만족도 낮음'
              satisfactionEmoji='😒'
              onDelete={() => alert('삭제')}
              onClose={closeModal}
              onConfirm={() => {
                alert('소비 입력 완료');
                closeModal();
              }}
            />
          </BottomSheet>
        </div>
      );
    };

    return <TemplateDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          '소비 금액, 사용처, 날짜, 카테고리, 감정 정보를 입력할 수 있는 기본 소비 입력 폼입니다. 모든 필드를 채우고 확인 버튼을 눌러 소비 기록을 저장할 수 있습니다.',
      },
    },
    story: {
      inline: false,
      height: '600px',
    },
  },
};

export const EmptyForm: Story = {
  name: '빈 폼',
  render: () => {
    const TemplateDemo = () => {
      const { isOpen, openModal, closeModal } = useModal();
      const [amount, setAmount] = useState<number>(0);
      const [usage, setUsage] = useState<string>('');
      const [selectedDate] = useState<Date>(new Date());
      const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
          <Button variant='brand' onClick={openModal}>
            새 소비 입력
          </Button>

          <BottomSheet isOpen={isOpen} onClose={closeModal}>
            <ExpenseFormBottomSheet
              amount={amount}
              onAmountChange={(value) => setAmount(Number(value))}
              usage={usage}
              onUsageChange={setUsage}
              selectedDate={selectedDate}
              onDateClick={() => alert('날짜 선택')}
              selectedCategoryId={selectedCategoryId}
              onCategorySelect={(category) => setSelectedCategoryId(category.id)}
              onMoreCategoryClick={() => alert('더보기 클릭')}
              onDelete={() => alert('삭제')}
              onClose={closeModal}
              onConfirm={() => {
                alert('소비 입력 완료');
                closeModal();
              }}
            />
          </BottomSheet>
        </div>
      );
    };

    return <TemplateDemo />;
  },
  parameters: {
    docs: {
      description: {
        story: '모든 필드가 비어있는 초기 상태의 소비 입력 폼입니다.',
      },
    },
    story: {
      inline: false,
      height: '600px',
    },
  },
};
