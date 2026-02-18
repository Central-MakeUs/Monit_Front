import type { Meta, StoryObj } from '@storybook/nextjs';
import { PlusBtn } from './PlusBtn';
import { getFigmaUrl } from '@/shared/config/figma';

const meta: Meta<typeof PlusBtn> = {
  title: 'Components/PlusButton',
  component: PlusBtn,

  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: getFigmaUrl('62-270'),
    },
    docs: {
      description: {
        component: [
          ' 화면에 새로운 항목을 추가하는 역할을 하는 플러스(+) 버튼 컴포넌트입니다.',
          '',
        ].join('\n'),
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
