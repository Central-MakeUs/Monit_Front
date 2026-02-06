'use client';
import {
  TopBar,
  vars,
  Text,
  InputField,
  TextInput,
  CategoryBtn,
  BottomFixedArea,
  Button,
  BottomSheet,
  useToast,
  AlertDialog,
} from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import React, { useState, useTransition, useMemo } from 'react';
import * as styles from './AddCategory.css';
import { IconPickerBottomSheetTemplate } from '@/features/expense';
import type { Category } from '@/features/expense';
import { useModal } from '@/shared/hooks';
import { useRouter } from 'next/navigation';
import { useCategoryStore } from '@/entities/category/model/store';
import { useExpenseFormStore } from '@/widgets/expenseRecordFunnel/model/store';

const VALID_NAME_REGEX = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]*$/;

const ICON_OPTIONS: Category[] = [
  //TODO: 확정되면 수정
  { id: 'coin', icon: 'coin', label: '코인' },
  { id: 'percent', icon: 'percent', label: '할인' },
  { id: 'shopping', icon: 'shopping', label: '쇼핑' },
];

export const AddCategory = () => {
  const {
    isOpen: isBottomSheetOpen,
    openModal: openBottomSheet,
    closeModal: closeBottomSheet,
  } = useModal();
  const { isOpen: isAlertOpen, openModal: openAlert, closeModal: closeAlert } = useModal();
  const toast = useToast();
  const router = useRouter();
  const { categories, addCategory } = useCategoryStore();
  const { setCategoryId } = useExpenseFormStore();

  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<Category | null>(null);
  const [tempIcon, setTempIcon] = useState<Category | null>(null);
  const [isPending, startTransition] = useTransition();

  // 에러 검사
  const validationError = useMemo(() => {
    if (!categoryName) return null;
    // 한글, 영문, 숫자만 허용
    if (!VALID_NAME_REGEX.test(categoryName)) {
      return 'invalid';
    }
    // 이미 존재하는 이름인지 확인
    const isDuplicate = categories.some(
      (c) => c.name?.toLowerCase() === categoryName.toLowerCase()
    );
    if (isDuplicate) {
      return 'duplicate';
    }
    return null;
  }, [categoryName, categories]);

  // 에러 메시지 (항상 표시, 에러 시 다른 메시지)
  const errorMessage =
    validationError === 'duplicate'
      ? '이미 존재하는 이름이에요.'
      : '한글, 영문, 숫자만 5자 이내로 입력가능해요.';

  const hasError = validationError !== null;
  const isValid = categoryName && selectedIcon && !hasError;

  const handleOpenIconPicker = () => {
    setTempIcon(selectedIcon);
    openBottomSheet();
  };

  const handleConfirm = () => {
    setSelectedIcon(tempIcon);
    closeBottomSheet();
  };

  const handleSubmit = () => {
    if (!selectedIcon) return;
    startTransition(async () => {
      // TODO: API 호출 후 응답 id 사용
      // 임시로 timestamp를 id로 사용 -> 서버 응답 오면 응답 ID 넣기
      const newId = Date.now();
      addCategory({
        id: newId,
        name: categoryName,
        icon: selectedIcon.icon as 'coin' | 'percent' | 'shopping' | 'plus',
      });
      // 새로 만든 카테고리 자동 선택
      setCategoryId(newId);
      toast.success('카테고리가 추가되었어요!');
      router.back();
    });
  };

  return (
    <div>
      <TopBar
        left={<IcLeftChevron onClick={openAlert} />}
        center={
          <Text variant='t1' color={vars.color.text.primary}>
            카테고리 추가
          </Text>
        }
      />
      <div className={styles.container}>
        <Text variant='t4' color={vars.color.text.primary}>
          카테고리 이름을 <br />
          알려주세요
        </Text>
        <TextInput
          placeholder='이름을 입력해주세요'
          value={categoryName}
          onValueChange={setCategoryName}
          error={hasError}
          errorMessage={errorMessage}
          maxLength={5}
        />
        <InputField label='아이콘' className={styles.inputFieldStyle}>
          <CategoryBtn
            icon={selectedIcon?.icon ?? 'plus'}
            size='lg'
            type='neutral'
            onClick={handleOpenIconPicker}
          />
        </InputField>
      </div>
      <BottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet}>
        <IconPickerBottomSheetTemplate
          categories={ICON_OPTIONS}
          selectedId={tempIcon?.id}
          onSelect={setTempIcon}
          onConfirm={handleConfirm}
          onClose={closeBottomSheet}
        />
      </BottomSheet>
      <BottomFixedArea zIndex={-1}>
        <Button variant='primary' disabled={!isValid || isPending} size='lg' onClick={handleSubmit}>
          추가하기
        </Button>
      </BottomFixedArea>
      <AlertDialog
        isOpen={isAlertOpen}
        onClose={closeAlert}
        variant='left'
        title='카테고리 추가를 그만둘까요?'
        description='지금 나가면 카테고리는 추가되지 않아요.'
        cancelText='그만두기'
        confirmText='계속 추가하기'
        onCancel={() => router.back()}
      />
    </div>
  );
};
