import type { Meta, StoryObj } from '@storybook/nextjs';
import { Toggle } from './Toggle';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: getFigmaUrl('1942-9538'),
    },
    docs: {
      description: {
        component: [
          'On/Off 상태를 전환하는 스위치 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **checked**: 체크 상태',
          '- **defaultChecked**: 기본 체크 상태',
          '- **onChange**: 상태 변경 콜백 `(checked: boolean) => void`',
          '- **disabled**: 비활성화 상태',
          '- **ref**: input 요소에 대한 ref 전달 가능',
          '',
        ].join('\n'),
      },
    },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
