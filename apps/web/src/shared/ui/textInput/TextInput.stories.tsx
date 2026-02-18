import type { Meta, StoryObj } from '@storybook/nextjs';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput/Base',
  component: TextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '텍스트 또는 숫자를 입력받는 기본 입력 컴포넌트입니다.',
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
        defaultValue: { summary: 'text' },
      },
    },
    state: {
      control: 'select',
      options: ['default', 'active', 'error', 'disabled'],
      description: '입력 필드 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    maxLength: {
      control: 'number',
      description: '최대 글자 수 (text 타입)',
    },
    showMaxLength: {
      control: 'boolean',
      description: '글자 수 표시 여부',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    maxNumber: {
      control: 'number',
      description: '최대 숫자 값 (number 타입)',
    },
    suffix: {
      control: 'text',
      description: '입력값 뒤에 표시할 단위',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지',
    },
    onValueChange: { action: 'valueChanged' },
    onClear: { action: 'cleared' },
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

// 기본 텍스트 입력
export const Default: Story = {
  args: {
    placeholder: '사용처를 입력해주세요',
    fieldType: 'text',
  },
  decorators: storyDecorator,
};

// 숫자 입력
export const Number: Story = {
  args: {
    placeholder: '0',
    fieldType: 'number',
    suffix: '원',
  },
  decorators: storyDecorator,
};

// 최대 글자 수 제한
export const WithMaxLength: Story = {
  args: {
    placeholder: '사용처를 입력해주세요',
    fieldType: 'text',
    maxLength: 20,
    showMaxLength: true,
    errorMessage: '한글, 영문, 숫자만 20자 이내로 입력가능해요.',
  },
  decorators: storyDecorator,
};

// 최대 숫자 제한
export const ErrorWithNumber: Story = {
  args: {
    value: '1000',
    fieldType: 'number',
    suffix: '원',
    maxNumber: 200,
    errorMessage: '너무 큰 금액이에요',
  },
  decorators: storyDecorator,
};

// 에러 상태
export const ErrorWithText: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    fieldType: 'text',
    error: true,
    errorMessage: '올바른 값을 입력해주세요',
  },
  decorators: storyDecorator,
};

// 가이드 메시지
export const WithNoError: Story = {
  args: {
    placeholder: '닉네임',
    fieldType: 'text',
    errorMessage: '2~10자 이내로 입력해주세요',
  },
  decorators: storyDecorator,
};

// 모든 상태 비교
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Default
        </h3>
        <TextInput placeholder='기본 상태' />
      </div>

      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Active (포커스)
        </h3>
        <TextInput placeholder='활성 상태' state='active' />
      </div>

      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Error
        </h3>
        <TextInput placeholder='에러 상태' error errorMessage='올바른 값을 입력해주세요' />
      </div>

      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Disabled
        </h3>
        <TextInput placeholder='비활성화 상태' disabled />
      </div>
    </div>
  ),
};

export const FieldTypeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '400px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Text 타입
        </h3>
        <TextInput
          placeholder='텍스트 입력'
          fieldType='text'
          maxLength={20}
          errorMessage='한글, 영문, 숫자만 20자 이내로 입력가능해요.'
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Number 타입 (suffix 포함)
        </h3>
        <TextInput
          placeholder='0'
          fieldType='number'
          suffix='원'
          maxNumber={1000}
          errorMessage='너무 큰 금액이에요'
        />
      </div>
    </div>
  ),
};
