import React from 'react';
import {
  pickerColumn,
  pickerWrapper,
  pickerList,
  pickerItem,
  highlightOverlay,
} from '@/shared/ui/datePicker/styles/PickerColumn.css';
import { usePickerScroll } from '@/shared/ui/datePicker/model/usePickerScroll';

interface PickerColumnProps<T> {
  items: T[];
  selectedIndex: number;
  onChange: (index: number) => void;
  renderItem: (item: T) => string;
}

export function PickerColumn<T>({
  items,
  selectedIndex,
  onChange,
  renderItem,
}: PickerColumnProps<T>): React.JSX.Element {
  const { listRef, handleScroll, handleClick } = usePickerScroll({
    selectedIndex,
    onChange,
    itemsCount: items.length,
  });

  return (
    <div className={pickerColumn}>
      <div className={pickerWrapper}>
        <div ref={listRef} className={pickerList} onScroll={handleScroll}>
          {items.map((item, index) => (
            <div
              key={index}
              className={pickerItem({ isSelected: index === selectedIndex })}
              onClick={() => handleClick(index)}>
              {renderItem(item)}
            </div>
          ))}
        </div>
        <div className={highlightOverlay} />
      </div>
    </div>
  );
}
