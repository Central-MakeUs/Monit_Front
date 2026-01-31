import React from 'react';
import { separator } from '@/shared/ui/datePicker/styles/DatePicker.css';

export function PickerSeparator(): React.JSX.Element {
  return <span className={separator}>/</span>;
}
