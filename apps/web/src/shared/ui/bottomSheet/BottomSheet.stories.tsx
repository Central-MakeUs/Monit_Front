import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { BottomSheet } from './BottomSheet';
import { Button } from '../button';
import { Text } from '../text';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
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
          'BottomSheet는 화면 하단에서 슬라이드되어 올라오는 모달 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **isOpen**: BottomSheet 열림/닫힘 상태를 제어합니다.',
          '- **onClose**: 백드롭 클릭 시 호출되는 닫기 핸들러입니다.',
          '- **transparent**: 백드롭의 투명도를 제어합니다 (기본값: false).',
          '- Portal을 사용하여 document.body에 렌더링됩니다.',
          '- 열릴 때 body 스크롤을 비활성화합니다.',
          '',
          '## 사용 예시',
          '```tsx',
          'const [isOpen, setIsOpen] = useState(false);',
          '',
          '<Button onClick={() => setIsOpen(true)}>',
          '  BottomSheet 열기',
          '</Button>',
          '',
          '<BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>',
          '  <div style={{ padding: "20px" }}>',
          '    <Text>BottomSheet 내용</Text>',
          '  </div>',
          '</BottomSheet>',
          '```',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'BottomSheet 열림 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      description: '닫기 핸들러 함수',
      table: {
        type: { summary: '() => void' },
      },
    },
    transparent: {
      control: 'boolean',
      description: '백드롭 투명 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      description: 'BottomSheet 내부에 표시될 컨텐츠',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 BottomSheet',
  args: {
    isOpen: false,
    onClose: () => {},
    transparent: false,
    children: <div>BottomSheet 내용</div>,
  },
  render: () => {
    const TemplateDemo = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
          <Button variant='brand' onClick={() => setIsOpen(true)}>
            BottomSheet 열기
          </Button>

          <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div style={{ padding: '20px' }}>
              <Text variant='h2'>BottomSheet 내용</Text>
              <Text variant='b2'>기본 BottomSheet 컴포넌트입니다.</Text>
            </div>
          </BottomSheet>
        </div>
      );
    };

    return <TemplateDemo />;
  },
  parameters: {
    docs: {
      description: {
        story: '기본 백드롭을 가진 BottomSheet입니다. 백드롭을 클릭하면 BottomSheet가 닫힙니다.',
      },
    },
    story: {
      inline: false,
      height: '500px',
    },
  },
};

export const Transparent: Story = {
  name: '투명 백드롭',
  args: {
    isOpen: false,
    onClose: () => {},
    transparent: true,
    children: <div>투명 백드롭 내용</div>,
  },
  render: () => {
    const TemplateDemo = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
          <Button variant='brand' onClick={() => setIsOpen(true)}>
            투명 백드롭 열기
          </Button>

          <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} transparent>
            <div style={{ padding: '20px' }}>
              <Text variant='h2'>투명 백드롭</Text>
              <Text variant='b2'>백드롭이 투명한 BottomSheet입니다.</Text>
            </div>
          </BottomSheet>
        </div>
      );
    };

    return <TemplateDemo />;
  },
  parameters: {
    docs: {
      description: {
        story: 'transparent prop을 true로 설정하면 백드롭이 투명하게 표시됩니다.',
      },
    },
    story: {
      inline: false,
      height: '500px',
    },
  },
};
