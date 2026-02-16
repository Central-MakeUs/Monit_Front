import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { categoryQueries } from '../model/categoryQueries';
import type { Category } from '../index';

export const VALID_NAME_REGEX = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]*$/;

export const ICON_OPTIONS: Category[] = [
  { id: 'shopping', icon: 'shopping', label: '쇼핑' },
  { id: 'cook', icon: 'cook', label: '요리' },
  { id: 'coffee', icon: 'coffee', label: '커피' },
  { id: 'credit', icon: 'credit', label: '카드' },
  { id: 'book', icon: 'book', label: '도서' },
  { id: 'beauty', icon: 'beauty', label: '뷰티' },
  { id: 'beer', icon: 'beer', label: '맥주' },
  { id: 'camera', icon: 'camera', label: '카메라' },
  { id: 'cup', icon: 'cup', label: '컵' },
];

export interface UseAddCategoryFormOptions {
  /** 수정 모드일 때 제외할 카테고리 ID */
  excludeId?: number | null;
  /** 초기 카테고리 이름 */
  initialName?: string;
  /** 초기 아이콘 */
  initialIcon?: string;
}

export type ValidationError = 'invalid' | 'duplicate' | null;

export const useAddCategoryForm = (options: UseAddCategoryFormOptions = {}) => {
  const { excludeId = null, initialName = '', initialIcon } = options;

  const { data: categoryData } = useQuery(categoryQueries.listQuery());
  const categories = useMemo(() => categoryData?.result ?? [], [categoryData?.result]);

  const [categoryName, setCategoryName] = useState(initialName);
  const [selectedIcon, setSelectedIcon] = useState<Category | null>(() => {
    if (initialIcon) {
      return ICON_OPTIONS.find((opt) => opt.icon === initialIcon) ?? null;
    }
    return null;
  });
  const [tempIcon, setTempIcon] = useState<Category | null>(null);

  // 에러 검사
  const validationError = useMemo<ValidationError>(() => {
    if (!categoryName) return null;

    // 한글, 영문, 숫자만 허용
    if (!VALID_NAME_REGEX.test(categoryName)) {
      return 'invalid';
    }

    // 이미 존재하는 이름인지 확인 (excludeId가 있으면 해당 ID는 제외)
    const isDuplicate = categories.some(
      (c) => c.name?.toLowerCase() === categoryName.toLowerCase() && c.id !== excludeId
    );

    if (isDuplicate) {
      return 'duplicate';
    }

    return null;
  }, [categoryName, categories, excludeId]);

  // 에러 메시지
  const errorMessage =
    validationError === 'duplicate'
      ? '이미 존재하는 이름이에요.'
      : '한글, 영문, 숫자만 5자 이내로 입력가능해요.';

  const hasError = validationError !== null;

  // 수정 모드에서 변경 사항이 있는지 확인
  const hasChanges =
    excludeId !== null ? categoryName !== initialName || selectedIcon?.icon !== initialIcon : true;

  const isValid = categoryName && selectedIcon && !hasError && hasChanges;

  // Icon Picker 핸들러
  const handleOpenIconPicker = (onOpen: () => void) => {
    setTempIcon(selectedIcon);
    onOpen();
  };

  const handleConfirmIcon = (onClose: () => void) => {
    setSelectedIcon(tempIcon);
    onClose();
  };

  return {
    // State
    categoryName,
    setCategoryName,
    selectedIcon,
    setSelectedIcon,
    tempIcon,
    setTempIcon,

    // Validation
    validationError,
    errorMessage,
    hasError,
    isValid,
    hasChanges,

    // Handlers
    handleOpenIconPicker,
    handleConfirmIcon,

    // Data
    categories,
  };
};
