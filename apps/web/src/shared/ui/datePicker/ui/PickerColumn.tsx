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
  isDisabled?: (item: T) => boolean;
}

export function PickerColumn<T>({
  items,
  selectedIndex,
  onChange,
  renderItem,
  isDisabled,
}: PickerColumnProps<T>): React.JSX.Element {
  // 인덱스 기반 disabled 체크 함수
  const isIndexDisabled = React.useCallback(
    (index: number) => {
      if (!isDisabled) return false;
      return isDisabled(items[index]!);
    },
    [isDisabled, items]
  );

  const { listRef, handleScroll, handleClick } = usePickerScroll({
    selectedIndex,
    onChange,
    itemsCount: items.length,
    isIndexDisabled,
  });

  return (
    <div className={pickerColumn}>
      <div className={pickerWrapper}>
        <div ref={listRef} className={pickerList} onScroll={handleScroll}>
          {items.map((item, index) => {
            const disabled = isDisabled ? isDisabled(item) : false;
            if (disabled) return null;

            return (
              <div
                key={index}
                className={pickerItem({
                  isSelected: index === selectedIndex,
                })}
                onClick={() => handleClick(index)}>
                {renderItem(item)}
              </div>
            );
          })}
        </div>
        <div className={highlightOverlay} />
      </div>
    </div>
  );
}
