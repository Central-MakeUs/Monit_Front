import type { Meta, StoryObj } from '@storybook/nextjs';
import { DatePicker } from './DatePicker';
import { useState } from 'react';
import { DatePickerValue } from '../lib/datePickerUtils';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### DatePicker 컴포넌트

모바일 환경에 최적화된 연도와 월을 선택할 수 있는 DatePicker입니다.
Scroll Snap 기능을 사용하여 부드러운 스크롤 경험을 제공합니다.

### 주요 기능
- **연/월 선택**: 지정된 범위 내의 연도와 1~12월을 선택할 수 있습니다.
- **Scroll Snap**: 스크롤 시 항목이 중앙에 정렬되도록 Snap 효과가 적용됩니다.

### 사용법
\`\`\`tsx
const [value, setValue] = useState({ year: 2024, month: 1 });

<DatePicker
  value={value}
  onChange={setValue}
  minYear={2000}
  maxYear={2030}
/>
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: '현재 선택된 연도와 월 값입니다.',
      table: {
        type: { summary: '{ year: number; month: number }' },
      },
    },
    onChange: {
      action: 'onChange',
      description: '값이 변경되었을 때 호출되는 콜백 함수입니다.',
      table: {
        type: { summary: '(value: { year: number; month: number }) => void' },
      },
    },
    minYear: {
      control: 'number',
      description: '선택 가능한 최소 연도입니다.',
      table: {
        defaultValue: { summary: '1900' },
      },
    },
    maxYear: {
      control: 'number',
      description: '선택 가능한 최대 연도입니다.',
      table: {
        defaultValue: { summary: '2100' },
      },
    },
    formatters: {
      control: 'object',
      description: '연도와 월의 표시 형식을 지정하는 포맷터 객체입니다.',
      table: {
        type: { summary: '{ year?: (year: number) => string; month?: (month: number) => string }' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/**
 * 기본 사용 예시입니다.
 * 2000년부터 2030년까지의 연도를 선택할 수 있습니다.
 */
export const Default: Story = {
  args: {
    minYear: 2000,
    maxYear: 2030,
  },
  render: (args) => {
    const [value, setValue] = useState<DatePickerValue>({ year: 2024, month: 1 });
    return (
      <div style={{ padding: '20px', background: '#fff', borderRadius: '16px' }}>
        <DatePicker {...args} value={value} onChange={setValue} />
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
          선택된 값: {value.year}년 {value.month}월
        </p>
      </div>
    );
  },
};

/**
 * 커스텀 연도 범위를 설정한 예시입니다.
 * 2020년부터 2025년까지만 선택 가능합니다.
 */
export const CustomRange: Story = {
  args: {
    minYear: 2020,
    maxYear: 2025,
  },
  render: (args) => {
    const [value, setValue] = useState<DatePickerValue>({ year: 2022, month: 6 });
    return (
      <div style={{ padding: '20px', background: '#fff', borderRadius: '16px' }}>
        <DatePicker {...args} value={value} onChange={setValue} />
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
          선택된 값: {value.year}년 {value.month}월
        </p>
      </div>
    );
  },
};
