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
import React, { useState, useTransition, useMemo, useEffect } from 'react';
import * as styles from './AddCategory.css';
import { IconPickerBottomSheetTemplate } from '@/features/expense';
import type { Category } from '@/features/expense';
import { useModal } from '@/shared/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const isFromMypage = searchParams.get('from') === 'mypage';
  const mode = searchParams.get('mode') === 'edit' ? 'edit' : 'add';
  const editId = searchParams.get('id') ? Number(searchParams.get('id')) : null;
  const isEditMode = mode === 'edit' && editId !== null;

  const { categories, addCategory, updateCategory } = useCategoryStore();
  const { setCategoryId } = useExpenseFormStore();

  // 수정 모드일 때 기존 카테고리 찾기
  const editingCategory = isEditMode ? categories.find((c) => c.id === editId) : null;

  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<Category | null>(null);
  const [tempIcon, setTempIcon] = useState<Category | null>(null);
  const [isPending, startTransition] = useTransition();

  // 수정 모드일 때 초기값 설정
  useEffect(() => {
    if (editingCategory) {
      setCategoryName(editingCategory.name ?? '');
      const iconOption = ICON_OPTIONS.find((opt) => opt.icon === editingCategory.icon);
      if (iconOption) {
        setSelectedIcon(iconOption);
      }
    }
  }, [editingCategory]);

  // 에러 검사
  const validationError = useMemo(() => {
    if (!categoryName) return null;
    // 한글, 영문, 숫자만 허용
    if (!VALID_NAME_REGEX.test(categoryName)) {
      return 'invalid';
    }
    // 이미 존재하는 이름인지 확인 (수정 모드일 때 자기 자신은 제외)
    const isDuplicate = categories.some(
      (c) =>
        c.name?.toLowerCase() === categoryName.toLowerCase() && (!isEditMode || c.id !== editId)
    );
    if (isDuplicate) {
      return 'duplicate';
    }
    return null;
  }, [categoryName, categories, isEditMode, editId]);

  // 에러 메시지 (항상 표시, 에러 시 다른 메시지)
  const errorMessage =
    validationError === 'duplicate'
      ? '이미 존재하는 이름이에요.'
      : '한글, 영문, 숫자만 5자 이내로 입력가능해요.';

  const hasError = validationError !== null;

  // 수정 모드에서 변경 사항이 있는지 확인
  const hasChanges = isEditMode
    ? categoryName !== (editingCategory?.name ?? '') || selectedIcon?.icon !== editingCategory?.icon
    : true;

  const isValid = categoryName && selectedIcon && !hasError && hasChanges;

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
      if (isEditMode && editId) {
        // 수정 모드
        updateCategory(editId, {
          name: categoryName,
          icon: selectedIcon.icon as 'coin' | 'percent' | 'shopping' | 'plus',
        });
        toast.success('수정한 내용이 저장되었어요!');
      } else {
        // 추가 모드
        // TODO: API 호출 후 응답 id 사용
        // 임시로 timestamp를 id로 사용 -> 서버 응답 오면 응답 ID 넣기
        const newId = Date.now();
        addCategory({
          id: newId,
          name: categoryName,
          icon: selectedIcon.icon as 'coin' | 'percent' | 'shopping' | 'plus',
        });
        // 지출 기록 플로우에서 온 경우에만 새 카테고리 자동 선택
        if (!isFromMypage) {
          setCategoryId(newId);
        }
        toast.success('카테고리가 추가되었어요!');
      }
      router.back();
    });
  };

  return (
    <div>
      <TopBar
        left={<IcLeftChevron onClick={openAlert} />}
        center={
          <Text variant='t1' color={vars.color.text.primary}>
            {isEditMode ? '카테고리 수정' : '카테고리 추가'}
          </Text>
        }
      />
      <div className={styles.container}>
        <Text variant='t4' color={vars.color.text.primary}>
          {isEditMode ? '변경할 카테고리 이름을' : '카테고리 이름을'} <br />
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
      <BottomFixedArea zIndex={1}>
        <Button variant='primary' disabled={!isValid || isPending} size='lg' onClick={handleSubmit}>
          {isEditMode ? '수정하기' : '추가하기'}
        </Button>
      </BottomFixedArea>
      <AlertDialog
        isOpen={isAlertOpen}
        onClose={closeAlert}
        variant='left'
        title={isEditMode ? '카테고리 수정을 그만둘까요?' : '카테고리 추가를 그만둘까요?'}
        description={
          isEditMode
            ? '지금 나가면 카테고리는 수정되지 않아요.'
            : '지금 나가면 카테고리는 추가되지 않아요.'
        }
        cancelText='그만두기'
        confirmText={isEditMode ? '계속 수정하기' : '계속 추가하기'}
        onCancel={() => router.back()}
      />
    </div>
  );
};
