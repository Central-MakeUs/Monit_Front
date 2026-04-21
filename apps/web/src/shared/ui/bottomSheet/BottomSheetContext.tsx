import { createContext, useContext } from 'react';

interface BottomSheetContextValue {
  onClose: () => void;
}

export const BottomSheetContext = createContext<BottomSheetContextValue | null>(null);

export const useBottomSheetContext = (): BottomSheetContextValue => {
  const ctx = useContext(BottomSheetContext);
  if (!ctx) throw new Error('useBottomSheetContext must be used within BottomSheet');
  return ctx;
};
