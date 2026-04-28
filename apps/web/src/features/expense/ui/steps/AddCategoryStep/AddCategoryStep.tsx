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
  type CategoryItem,
} from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import React, { useState, useMemo } from 'react';
import * as styles from './AddCategoryStep.css';
import { IconPickerBottomSheetTemplate } from '@/features/expense';
import { ICON_OPTIONS } from '@/shared/constants';
import { useModal } from '@/shared/hooks';
import { useCategoryStore } from '@/entities/category/model/store';
import { useExpenseFormStore } from '@/widgets/expenseRecordFunnel/model/store';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryQueries } from '@/features/expense/model/categoryQueries';
import { CategoryDetailsDTO } from '@/features/expense/model/types';
import { handleApiError } from '@/shared/api';

const VALID_NAME_REGEX = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]*$/;

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
  const { data: categoryData } = useQuery(categoryQueries.listQuery());
  const categories = useMemo(() => categoryData?.result ?? [], [categoryData?.result]);

  const { mutate: createCategory, isPending } = useMutation(
    categoryQueries.createMutation(queryClient)
  );

  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<CategoryItem | null>(null);
  const [tempIcon, setTempIcon] = useState<CategoryItem | null>(null);

  // 에러 검사
  const validationError = useMemo(() => {
    if (!categoryName) return null;
    if (!VALID_NAME_REGEX.test(categoryName)) {
      return 'invalid';
    }
    const isDuplicate = categories.some(
      (c) => c.name?.toLowerCase() === categoryName.toLowerCase()
    );
    if (isDuplicate) {
      return 'duplicate';
    }
    return null;
  }, [categoryName, categories]);

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
    createCategory(
      {
        name: categoryName,
        icon: selectedIcon.icon as CategoryDetailsDTO['icon'],
      },
      {
        onSuccess: (response) => {
          const newId = response.result?.id;
          if (newId) {
            selectCategory(newId);
            setCategoryId(newId);
          }
          toast.success('카테고리가 추가되었어요!');
          useExpenseFormStore.setState({ shouldOpenCategorySheet: false });
          onBack();
        },
        onError: (error) => {
          handleApiError(error, {
            toast,
            fallback: '카테고리 추가에 실패했어요. 다시 시도해 주세요.',
            context: 'category.create',
          });
        },
      }
    );
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
