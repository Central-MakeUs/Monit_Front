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
import React from 'react';
import * as styles from './AddCategoryStep.css';
import {
  IconPickerBottomSheetTemplate,
  useAddCategoryForm,
  ICON_OPTIONS,
} from '@/features/expense';
import { useModal } from '@/shared/hooks';
import { useCategoryStore } from '@/entities/category/model/store';
import { useExpenseFormStore } from '@/widgets/expenseRecordFunnel/model/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryQueries } from '@/features/expense/model/categoryQueries';
import { CategoryDetailsDTO } from '@/features/expense/model/types';

export interface AddCategoryStepProps {
  onBack: () => void;
}

export const AddCategoryStep = ({ onBack }: AddCategoryStepProps) => {
  const {
    isOpen: isBottomSheetOpen,
    openModal: openBottomSheet,
    closeModal: closeBottomSheet,
  } = useModal();
  const { isOpen: isAlertOpen, openModal: openAlert, closeModal: closeAlert } = useModal();
  const toast = useToast();

  const queryClient = useQueryClient();
  const { selectCategory } = useCategoryStore();
  const { setCategoryId } = useExpenseFormStore();

  const {
    categoryName,
    setCategoryName,
    selectedIcon,
    tempIcon,
    setTempIcon,
    errorMessage,
    hasError,
    isValid,
    handleOpenIconPicker,
    handleConfirmIcon,
  } = useAddCategoryForm();

  const { mutate: createCategory, isPending } = useMutation({
    ...categoryQueries.createMutation(queryClient),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: categoryQueries.all });
      const newId = response.result?.id;
      if (newId) {
        selectCategory(newId);
        setCategoryId(newId);
      }
      toast.success('카테고리가 추가되었어요!');
      useExpenseFormStore.setState({ shouldOpenCategorySheet: true });
      onBack();
    },
  });

  const handleSubmit = () => {
    if (!selectedIcon) return;
    createCategory({
      name: categoryName,
      icon: selectedIcon.icon as CategoryDetailsDTO['icon'],
    });
  };

  const handleBack = () => {
    const hasInput = categoryName || selectedIcon;
    if (!hasInput) {
      onBack();
    } else {
      openAlert();
    }
  };

  return (
    <div>
      <TopBar
        left={<IcLeftChevron onClick={handleBack} />}
        center={
          <Text variant='t1' color={vars.color.text.primary}>
            {'카테고리 추가'}
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
        onCancel={onBack}
      />
    </div>
  );
};
