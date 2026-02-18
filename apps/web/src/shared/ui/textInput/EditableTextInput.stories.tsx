import type { Meta, StoryObj } from '@storybook/nextjs';
import { EditableTextInput } from './EditableTextInput';

const meta: Meta<typeof EditableTextInput> = {
  title: 'Components/TextInput/Editable',
  component: EditableTextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '클릭하면 편집 모드로 전환되는 입력 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fieldType: {
      control: 'select',
      options: ['text', 'number'],
      description: '입력 필드 타입',
      table: {
        defaultValue: { summary: 'number' },
      },
    },
    displaySuffix: {
      control: 'text',
      description: '비편집 모드에서 값 뒤에 표시할 suffix',
    },
    maxNumber: {
      control: 'number',
      description: '최대 숫자 값 (number 타입)',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지',
    },
    onValueChange: { action: 'valueChanged' },
    onEditStart: { action: 'editStarted' },
    onBlur: { action: 'blurred' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const storyDecorator: Story['decorators'] = [
  (Story) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '400px' }}>
      <Story />
    </div>
  ),
];

// 기본 (숫자 타입)
export const Default: Story = {
  args: {
    defaultValue: '50000',
    fieldType: 'number',
  },
  decorators: storyDecorator,
};

// 텍스트 타입
export const TextType: Story = {
  args: {
    defaultValue: '홍길동',
    fieldType: 'text',
    displaySuffix: '',
  },
  decorators: storyDecorator,
};

// 커스텀 suffix
export const CustomSuffix: Story = {
  args: {
    defaultValue: '30',
    fieldType: 'number',
    displaySuffix: '%',
  },
  decorators: storyDecorator,
};

// 최대값 제한
export const WithMaxNumber: Story = {
  args: {
    defaultValue: '50000',
    fieldType: 'number',
    maxNumber: 100000,
    errorMessage: '100,000원을 초과할 수 없습니다',
  },
  decorators: storyDecorator,
};

// 최대값 초과 에러 상태
export const MaxNumberExceeded: Story = {
  args: {
    defaultValue: '150000',
    fieldType: 'number',
    maxNumber: 100000,
    errorMessage: '100,000원을 초과할 수 없습니다',
  },
  decorators: storyDecorator,
};

// 빈 값 (0으로 표시)
export const EmptyValue: Story = {
  args: {
    defaultValue: '',
    fieldType: 'number',
  },
  decorators: storyDecorator,
};
