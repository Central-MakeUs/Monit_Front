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
import React, { useState, useMemo, useEffect } from 'react';
import * as styles from './AddCategory.css';
import { IconPickerBottomSheetTemplate } from '@/features/expense';
import { ICON_OPTIONS } from '@/shared/constants';
import { useModal } from '@/shared/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCategoryStore } from '@/entities/category/model/store';
import { useExpenseFormStore } from '@/widgets/expenseRecordFunnel/model/store';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryQueries } from '@/features/expense/model/categoryQueries';
import { CategoryDetailsDTO } from '@/features/expense/model/types';
import { handleApiError } from '@/shared/api';

const VALID_NAME_REGEX = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]*$/;

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
  const from = searchParams.get('from');
  const isFromMypage = from === 'mypage';
  const isFromEdit = from === 'edit';
  const mode = searchParams.get('mode') === 'edit' ? 'edit' : 'add';
  const editId = searchParams.get('id') ? Number(searchParams.get('id')) : null;
  const isEditMode = mode === 'edit' && editId !== null;

  const queryClient = useQueryClient();
  const { selectCategory } = useCategoryStore();
  const { setCategoryId } = useExpenseFormStore();
  const { data: categoryData } = useQuery(categoryQueries.listQuery());
  const categories = useMemo(() => categoryData?.result ?? [], [categoryData?.result]);

  const { mutate: createCategory, isPending: isCreatePending } = useMutation(
    categoryQueries.createMutation(queryClient)
  );

  const { mutate: updateCategory, isPending: isUpdatePending } = useMutation(
    categoryQueries.updateMutation(queryClient)
  );

  const isPending = isCreatePending || isUpdatePending;

  // 수정 모드일 때 기존 카테고리 찾기
  const editingCategory = isEditMode ? categories.find((c) => c.id === editId) : null;

  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<CategoryItem | null>(null);
  const [tempIcon, setTempIcon] = useState<CategoryItem | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  // 에러 검사 (valid에서만 에러 표시, API 성공 직후 refetch 시 중복으로 잡히지 않도록)
  const validationError = useMemo(() => {
    if (!categoryName) return null;
    // 한글, 영문, 숫자만 허용
    if (!VALID_NAME_REGEX.test(categoryName)) {
      return 'invalid';
    }
    if (submitSuccess) return null;
    // 이미 존재하는 이름인지 확인 (수정 모드일 때 자기 자신은 제외)
    const isDuplicate = categories.some(
      (c) =>
        c.name?.toLowerCase() === categoryName.toLowerCase() && (!isEditMode || c.id !== editId)
    );
    if (isDuplicate) {
      return 'duplicate';
    }
    return null;
  }, [categoryName, categories, isEditMode, editId, submitSuccess]);

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
    if (isEditMode && editId) {
      updateCategory(
        {
          categoryId: editId,
          data: { name: categoryName, icon: selectedIcon.icon as CategoryDetailsDTO['icon'] },
        },
        {
          onSuccess: () => {
            toast.success('수정한 내용이 저장되었어요!');
            router.back();
          },
          onError: (error) => {
            handleApiError(error, {
              toast,
              fallback: '카테고리 수정에 실패했어요. 다시 시도해 주세요.',
              context: 'category.update',
            });
          },
        }
      );
    } else {
      createCategory(
        {
          name: categoryName,
          icon: selectedIcon.icon as CategoryDetailsDTO['icon'],
        },
        {
          onSuccess: (response) => {
            setSubmitSuccess(true);
            const newId = response.result?.id;
            if (newId && !isFromMypage) {
              selectCategory(newId);
              setCategoryId(newId);
            }
            if (isFromEdit) {
              router.push('/');
            } else {
              router.back();
            }
            toast.success('카테고리가 추가되었어요!');
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
    }
  };

  return (
    <div>
      <TopBar
        left={<IcLeftChevron onClick={hasChanges ? openAlert : () => router.back()} />}
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
