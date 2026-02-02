import type { Meta, StoryObj } from '@storybook/nextjs';
import { BottomSheet } from '@/shared/ui/bottomSheet';
import { Button } from '@/shared/ui';
import { CalendarBottomSheetTemplate } from './CalendarBottomSheet';
import { useModal } from '@/shared/hooks';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Widgets/Expense/CalendarBottomSheet',
  component: CalendarBottomSheetTemplate,
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
          'CalendarBottomSheet는 소비일을 수정할 수 있는 바텀시트 위젯입니다.',
          '',
          '## FSD 설계',
          '- **Layer**: widgets',
          '- **의존성**: widgets/calendar, shared/ui',
          '- **목적**: widgets/calendar를 조합한 완성된 UI 블록',
          '',
          '## 주요 기능',
          '- **selectedDate**: 현재 선택된 날짜입니다.',
          '- **onSelectDate**: 날짜 선택 시 호출되는 콜백입니다.',
          '- **onConfirm**: 선택 완료 버튼 클릭 시 호출되는 콜백입니다.',
          '- **onClose**: 닫기 버튼 클릭 시 호출되는 콜백입니다.',
          '',
          '## 사용 예시',
          '```tsx',
          'import { CalendarBottomSheetTemplate } from "@/widgets/expense";',
          '',
          'const [selectedDate, setSelectedDate] = useState(new Date());',
          '',
          '<CalendarBottomSheetTemplate',
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
    selectedDate: {
      control: 'date',
      description: '선택된 날짜',
      table: {
        type: { summary: 'Date' },
      },
    },
    onSelectDate: {
      description: '날짜 선택 시 콜백',
      table: {
        type: { summary: '(date: Date) => void' },
      },
    },
    onConfirm: {
      description: '선택 버튼 클릭 시 콜백',
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
} satisfies Meta<typeof CalendarBottomSheetTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 소비일 수정',
  render: () => {
    const TemplateDemo = () => {
      const { isOpen, openModal, closeModal } = useModal();

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
          <Button variant='brand' onClick={openModal}>
            소비일 수정 열기
          </Button>

          <BottomSheet isOpen={isOpen} onClose={closeModal}>
            <CalendarBottomSheetTemplate
              onClose={closeModal}
              onConfirm={() => {
                alert('소비일 수정 완료');
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
          '소비일을 수정할 수 있는 바텀시트 위젯입니다. Calendar 위젯을 조합하여 날짜를 선택하고 확인 버튼을 눌러 변경사항을 저장할 수 있습니다.',
      },
    },
    story: {
      inline: false,
      height: '600px',
    },
  },
};
