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
import React, { useEffect } from 'react';
import * as styles from './AddCategory.css';
import {
  IconPickerBottomSheetTemplate,
  useAddCategoryForm,
  ICON_OPTIONS,
} from '@/features/expense';
import { useModal } from '@/shared/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCategoryStore } from '@/entities/category/model/store';
import { useExpenseFormStore } from '@/widgets/expenseRecordFunnel/model/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryQueries } from '@/features/expense/model/categoryQueries';
import { CategoryDetailsDTO } from '@/features/expense/model/types';

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

  const queryClient = useQueryClient();
  const { selectCategory } = useCategoryStore();
  const { setCategoryId } = useExpenseFormStore();

  // 수정 모드일 때 기존 카테고리 찾기
  const editingCategory = isEditMode
    ? queryClient
        .getQueryData<{
          result?: Array<{ id: number; name?: string; icon?: string }>;
        }>(categoryQueries.listQuery().queryKey)
        ?.result?.find((c) => c.id === editId)
    : null;

  const {
    categoryName,
    setCategoryName,
    selectedIcon,
    setSelectedIcon,
    tempIcon,
    setTempIcon,
    errorMessage,
    hasError,
    isValid,
    handleOpenIconPicker,
    handleConfirmIcon,
  } = useAddCategoryForm({
    excludeId: isEditMode ? editId : null,
    initialName: editingCategory?.name ?? '',
    initialIcon: editingCategory?.icon ?? '',
  });

  // 수정 모드일 때 초기값 설정
  useEffect(() => {
    if (editingCategory) {
      setCategoryName(editingCategory.name ?? '');
      const iconOption = ICON_OPTIONS.find((opt) => opt.icon === editingCategory.icon);
      if (iconOption) {
        setSelectedIcon(iconOption);
      }
    }
  }, [editingCategory, setCategoryName, setSelectedIcon]);

  const { mutate: createCategory, isPending } = useMutation({
    ...categoryQueries.createMutation(queryClient),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: categoryQueries.all });
      const newId = response.result?.id;
      if (newId && !isFromMypage) {
        selectCategory(newId);
        setCategoryId(newId);
      }
      toast.success('카테고리가 추가되었어요!');
      router.back();
    },
  });

  const handleSubmit = () => {
    if (!selectedIcon) return;
    if (isEditMode && editId) {
      // 수정 모드 - TODO: patchCategoryUpdate 구현 시 연결
      toast.success('수정한 내용이 저장되었어요!');
      router.back();
    } else {
      createCategory({
        name: categoryName,
        icon: selectedIcon.icon as CategoryDetailsDTO['icon'],
      });
    }
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
            onClick={() => handleOpenIconPicker(openBottomSheet)}
          />
        </InputField>
      </div>
      <BottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet}>
        <IconPickerBottomSheetTemplate
          categories={ICON_OPTIONS}
          selectedId={tempIcon?.id}
          onSelect={setTempIcon}
          onConfirm={() => handleConfirmIcon(closeBottomSheet)}
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
