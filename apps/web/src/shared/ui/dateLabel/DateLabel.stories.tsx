import type { Meta, StoryObj } from '@storybook/nextjs';
import { DateLabel } from './DateLabel';

const meta: Meta<typeof DateLabel> = {
  title: 'Components/DateLabel',
  component: DateLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: '2026-01-16',
  },
};
