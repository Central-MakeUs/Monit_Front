import React from 'react';
import {
  pickerColumn,
  pickerWrapper,
  pickerList,
  pickerItem,
  highlightOverlay,
} from '@/shared/ui/datePicker/styles/PickerColumn.css';

interface PickerColumnProps<T> {
  items: T[];
  selectedIndex: number;
  onChange: (index: number) => void;
  renderItem: (item: T) => string;
}

const ITEM_HEIGHT = 4; // rem

export function PickerColumn<T>({
  items,
  selectedIndex,
  onChange,
  renderItem,
}: PickerColumnProps<T>): React.JSX.Element {
  const translateY = -selectedIndex * ITEM_HEIGHT;

  return (
    <div className={pickerColumn}>
      <div className={pickerWrapper}>
        <div
          className={pickerList}
          style={{
            transform: `translateY(${translateY}rem)`,
          }}>
          {items.map((item, index) => (
            <div
              key={index}
              className={pickerItem({ isSelected: index === selectedIndex })}
              onClick={() => onChange(index)}>
              {renderItem(item)}
            </div>
          ))}
        </div>
        <div className={highlightOverlay} />
      </div>
    </div>
  );
}
