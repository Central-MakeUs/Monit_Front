import type { Meta, StoryObj } from '@storybook/nextjs';
import { InputField } from './inputField';
import { TextInput } from '../textInput/TextInput';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'InputField는 라벨과 입력 필드를 함께 표시하는 컴포넌트입니다. children으로 TextInput을 전달하여 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: '입력 필드 상단에 표시되는 라벨',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description: 'TextInput 컴포넌트를 children으로 전달합니다',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

const storyDecorator: Story['decorators'] = [
  (Story) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '400px' }}>
      <Story />
    </div>
  ),
];

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '사용처',
    children: (
      <TextInput
        placeholder='사용처를 입력해주세요'
        fieldType='text'
        maxLength={20}
        errorMessage='한글, 영문, 숫자만 20자 이내로 입력가능해요.'
      />
    ),
  },
  decorators: storyDecorator,
};

export const WithNumberInput: Story = {
  args: {
    label: '금액',
    children: <TextInput placeholder='0' fieldType='number' suffix='원' />,
  },
  decorators: storyDecorator,
};
