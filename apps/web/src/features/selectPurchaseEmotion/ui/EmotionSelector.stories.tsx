import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { EmotionSelector } from './EmotionSelector';
import { EmotionDescription } from './EmotionDescription';
import { emotions } from '@/shared/constants';
import type { EmotionValue } from '@/shared/types';

// TODO: Figma연결(아직 명확히 안나와 있어서 보류)
const meta: Meta<typeof EmotionSelector> = {
  title: 'Components/EmotionSelector',
  component: EmotionSelector,
  argTypes: {
    defaultIndex: {
      description: '초기 선택 인덱스',
      control: { type: 'number', min: 0, max: 5 },
    },
    onChange: {
      description: '감정 선택 시 호출되는 콜백',
      action: 'changed',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '구매 시 느낀 감정을 선택하는 스크롤 피커 컴포넌트입니다. 스크롤하면서 실시간으로 선택된 감정이 변경되고, 스크롤이 멈추면 가장 가까운 아이템으로 스냅됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          width: '400px',
          // height: '600px',
          backgroundColor: '#f5f5f5',
          // margin: '6rem',
        }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultIndex: 1,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 EmotionSelector입니다. 스크롤하여 감정을 선택할 수 있습니다.',
      },
    },
  },
};

const WithDescriptionRender = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleChange = (_value: EmotionValue, index: number) => {
    setSelectedIndex(index);
  };

  const selectedEmotion = emotions[selectedIndex];

  return (
    <div>
      <EmotionSelector defaultIndex={selectedIndex} onChange={handleChange} />
      {selectedEmotion && <EmotionDescription emotion={selectedEmotion} />}
    </div>
  );
};

export const WithDescription: Story = {
  render: () => <WithDescriptionRender />,
  parameters: {
    docs: {
      description: {
        story:
          'EmotionDescription과 함께 사용하는 예시입니다. 선택된 감정에 따라 하단에 설명이 표시됩니다.',
      },
    },
  },
};
