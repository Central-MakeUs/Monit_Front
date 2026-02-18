import type { Meta, StoryObj } from '@storybook/nextjs';
import { Toast } from './Toast';
import { ToastContainer } from './ToastContainer';
import { useToast } from './useToast';
import { Button } from '../button';
import { getFigmaUrl } from '@/shared/config/figma';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: getFigmaUrl('760-8894'),
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'attention'],
      description: '토스트의 타입',
      table: {
        defaultValue: { summary: 'success' },
      },
    },
    message: {
      control: 'text',
      description: '토스트 메시지',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 성공 토스트
 */
export const Success: Story = {
  args: {
    variant: 'success',
    message: '텍스트를 입력 해 주세요.',
  },
};

/**
 * 주의 토스트
 */
export const Attention: Story = {
  args: {
    variant: 'attention',
    message: '텍스트를 입력 해 주세요.',
  },
};

/**
 * 성공 메시지 예시
 */
export const SuccessMessage: Story = {
  args: {
    variant: 'success',
    message: '저장되었습니다.',
  },
};

/**
 * 경고 메시지 예시
 */
export const AttentionMessage: Story = {
  args: {
    variant: 'attention',
    message: '입력값을 확인해주세요.',
  },
};

/**
 * 긴 메시지 예시
 */
export const LongMessage: Story = {
  args: {
    variant: 'success',
    message: '작업이 성공적으로 완료되었습니다. 잠시 후 페이지가 새로고침됩니다.',
  },
};

/**
 * useToast 훅 사용 예시
 */
const ToastExample = () => {
  const toast = useToast();

  return (
    <div style={{ display: 'flex', gap: '12px', padding: '20px' }}>
      <Button variant='brand' onClick={() => toast.success('저장되었습니다.')}>
        Success Toast
      </Button>
      <Button variant='secondary' onClick={() => toast.attention('입력값을 확인해주세요.')}>
        Attention Toast
      </Button>
    </div>
  );
};

export const WithHook: Story = {
  render: () => (
    <>
      <ToastExample />
      <ToastContainer />
    </>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
