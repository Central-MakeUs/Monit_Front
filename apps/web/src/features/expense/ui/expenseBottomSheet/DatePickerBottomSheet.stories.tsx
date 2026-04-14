import type { Meta, StoryObj } from '@storybook/nextjs';
import { BottomSheet } from '@/shared/ui/bottomSheet';
import { Button } from '@/shared/ui';
import { DatePickerBottomSheetTemplate } from './DatePickerBottomSheet';
import { useModal } from '@/shared/hooks';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Components/BottomSheet/DatePickerBottomSheet',
  component: DatePickerBottomSheetTemplate,
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
          'DatePickerBottomSheet는 월을 선택할 수 있는 바텀시트 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **selectedDate**: 현재 선택된 날짜입니다.',
          '- **onSelectDate**: 날짜 선택 시 호출되는 콜백입니다.',
          '- **onConfirm**: 선택 완료 버튼 클릭 시 호출되는 콜백입니다.',
          '- **onClose**: 닫기 버튼 클릭 시 호출되는 콜백입니다.',
          '- 달력 컴포넌트를 사용하여 월을 선택합니다 (TODO: 달력 컴포넌트 구현 필요).',
          '',
          '## 사용 예시',
          '```tsx',
          'const [selectedDate, setSelectedDate] = useState(new Date());',
          '',
          '<DatePickerBottomSheetTemplate',
          '  selectedDate={selectedDate}',
          '  onSelectDate={setSelectedDate}',
          '  onConfirm={() => {}}',
          '  onClose={() => {}}',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    initialYear: {
      control: 'number',
      description: '초기 연도',
      table: {
        type: { summary: 'number' },
      },
    },
    initialMonth: {
      control: 'number',
      description: '초기 월',
      table: {
        type: { summary: 'number' },
      },
    },
    onConfirm: {
      description: '선택 버튼 클릭 시 콜백',
      table: {
        type: { summary: '(year: number, month: number) => void' },
      },
    },
    onClose: {
      description: '닫기 버튼 클릭 시 콜백',
      table: {
        type: { summary: '() => void' },
      },
    },
    allowFuture: {
      control: 'boolean',
      description: '미래 날짜 선택 허용 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof DatePickerBottomSheetTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 월 선택',
  args: {
    initialYear: new Date().getFullYear(),
    initialMonth: new Date().getMonth() + 1,
  },
  render: (args) => {
    const TemplateDemo = () => {
      const { isOpen, openModal, closeModal } = useModal();

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            maxWidth: '430px',
            margin: '0 auto',
          }}>
          <Button variant='brand' onClick={openModal}>
            월 선택 열기
          </Button>

          <BottomSheet isOpen={isOpen} onClose={closeModal}>
            <DatePickerBottomSheetTemplate
              {...args}
              onClose={closeModal}
              onConfirm={(year, month) => {
                alert(`선택된 월: ${year}년 ${month}월`);
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
          '월을 선택할 수 있는 바텀시트입니다. 달력 컴포넌트를 통해 월을 선택하고 확인 버튼을 눌러 변경사항을 저장할 수 있습니다. (달력 컴포넌트는 구현 예정)',
      },
    },
    story: {
      inline: false,
      height: '600px',
    },
  },
};
