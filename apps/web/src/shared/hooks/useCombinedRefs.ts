import { useCallback } from 'react';

export const useCombinedRefs = <T>(...refs: Array<React.Ref<T>>): React.Ref<T> => {
  return useCallback(
    (element: T) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref != null) {
          (ref as React.RefObject<T>).current = element;
        }
      });
    },
    [refs]
  );
};
