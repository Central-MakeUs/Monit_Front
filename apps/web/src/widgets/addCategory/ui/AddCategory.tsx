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
import React, { useState, useTransition } from 'react';
import * as styles from './AddCategory.css';
import { IconPickerBottomSheetTemplate } from '@/features/expense';
import type { Category } from '@/features/expense';
import { useModal } from '@/shared/hooks';
import { useRouter } from 'next/navigation';

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

  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<Category | null>(null);
  const [tempIcon, setTempIcon] = useState<Category | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleOpenIconPicker = () => {
    setTempIcon(selectedIcon);
    openBottomSheet();
  };

  const handleConfirm = () => {
    setSelectedIcon(tempIcon);
    closeBottomSheet();
  };

  const handleSubmit = () => {
    startTransition(async () => {
      // TODO: API 호출
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
          errorMessage='한글, 영문, 숫자만 5자 이내로 입력가능해요.'
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
        <Button
          variant='primary'
          disabled={!categoryName || !selectedIcon || isPending}
          size='lg'
          onClick={handleSubmit}>
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
