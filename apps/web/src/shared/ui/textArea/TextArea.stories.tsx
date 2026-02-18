import type { Meta, StoryObj } from '@storybook/nextjs';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,

  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '텍스트를 입력할 수 있는 텍스트 영역 컴포넌트입니다.',
          '글자 수 카운터가 포함되어 있으며, maxLength를 통해 최대 글자 수를 제한할 수 있습니다.',
        ].join('\n'),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxLength: {
      control: { type: 'number' },
      description: '최대 글자 수',
      defaultValue: 1000,
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxLength: 1000,
    placeholder: '문의 사항을 입력해주세요',
  },
};
