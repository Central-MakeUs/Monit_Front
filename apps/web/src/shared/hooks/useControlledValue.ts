import { useState, useCallback } from 'react';

type SetValue<T> = (value: T) => void;

/**
 * 제어/비제어 컴포넌트 패턴을 위한 훅
 * @param controlledValue - 외부에서 제어하는 값 (undefined면 비제어 모드)
 * @param defaultValue - 비제어 모드일 때 초기값
 * @param onChange - 값 변경 시 호출되는 콜백
 * @returns [현재값, 값 설정 함수, 제어 모드 여부]
 */
export const useControlledValue = <T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, SetValue<T>, boolean] => {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  return [value, setValue, isControlled];
};
