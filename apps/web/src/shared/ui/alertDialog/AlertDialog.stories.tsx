import type { Meta, StoryObj } from '@storybook/nextjs';
import { AlertDialog } from './AlertDialog';
import { Button } from '../button';
import { getFigmaUrl } from '@/shared/config/figma';
import { IcCheckCircle } from 'public/icons';
import { useModal } from '@/shared/hooks';

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: getFigmaUrl('757-3270'),
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '다이얼로그 열림 상태',
    },
    variant: {
      control: 'select',
      options: ['left', 'center'],
      description: '다이얼로그 레이아웃 타입',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    title: {
      control: 'text',
      description: '다이얼로그 제목',
    },
    description: {
      control: 'text',
      description: '다이얼로그 설명',
    },
    confirmText: {
      control: 'text',
      description: '확인 버튼 텍스트',
    },
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트 (left variant만 해당)',
    },
    inline: {
      control: 'boolean',
      description: '인라인 모드 (overlay 없이 다이얼로그만 렌더링)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const AlertDialogModal = (props: Partial<React.ComponentProps<typeof AlertDialog>>) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '0 100px',
        }}>
        <Button variant='brand' onClick={openModal}>
          다이얼로그 열기
        </Button>
      </div>

      <AlertDialog
        isOpen={isOpen}
        onClose={closeModal}
        title='Title'
        description='description'
        {...props}
      />
    </div>
  );
};

export const Left: Story = {
  args: {
    isOpen: true,
    variant: 'left',
    title: 'Title',
    description: 'description',
    confirmText: '닫기',
    cancelText: '나중에 하기',
    inline: true,
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('1039-14392'),
    },
  },
};

export const Center: Story = {
  args: {
    isOpen: true,
    variant: 'center',
    title: '모든 소비 회고를 완료했어요',
    description: '이 기록을 바탕으로 주간 소비 리포트를 준비할게요',
    confirmText: '완료',
    icon: <IcCheckCircle />,
    inline: true,
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('1039-14409'),
    },
  },
};

export const LeftModal: Story = {
  args: {
    title: 'Title',
    description: 'description',
    confirmText: '닫기',
    cancelText: '나중에 하기',
  },
  render: (args) => <AlertDialogModal {...args} variant='left' />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '400px',
      },
    },
  },
};

export const CenterModal: Story = {
  args: {
    title: '모든 소비 회고를 완료했어요',
    description: '이 기록을 바탕으로 주간 소비 리포트를 준비할게요',
    confirmText: '완료',
    icon: <IcCheckCircle />,
  },
  render: (args) => <AlertDialogModal {...args} variant='center' />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '400px',
      },
    },
  },
};

export const AllVariants: Story = {
  args: {
    isOpen: true,
    title: 'Title',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Left (두 버튼)
        </h3>
        <AlertDialog
          isOpen={true}
          onClose={() => {}}
          variant='left'
          title='Title'
          description='description'
          confirmText='닫기'
          cancelText='나중에 하기'
          inline={true}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Center (아이콘 + 단일 버튼)
        </h3>

        <AlertDialog
          isOpen={true}
          onClose={() => {}}
          variant='center'
          title='모든 소비 회고를 완료했어요'
          description='이 기록을 바탕으로 주간 소비 리포트를 준비할게요'
          confirmText='완료'
          icon={<IcCheckCircle />}
          inline={true}
        />
      </div>
    </div>
  ),
};
