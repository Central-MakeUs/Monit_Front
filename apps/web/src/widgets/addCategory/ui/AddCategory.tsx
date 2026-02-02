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
} from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import React, { useState } from 'react';
import * as styles from './AddCategory.css';
import { IconPickerBottomSheetTemplate } from '@/features/expense';
import type { Category } from '@/features/expense';
import { useModal } from '@/shared/hooks';

const ICON_OPTIONS: Category[] = [
  //TODO: 확정되면 수정
  { id: 'coin', icon: 'coin', label: '코인' },
  { id: 'percent', icon: 'percent', label: '할인' },
  { id: 'shopping', icon: 'shopping', label: '쇼핑' },
];

export const AddCategory = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<Category | null>(null);
  const [tempIcon, setTempIcon] = useState<Category | null>(null);

  const handleOpenIconPicker = () => {
    setTempIcon(selectedIcon);
    openModal();
  };

  const handleConfirm = () => {
    setSelectedIcon(tempIcon);
    closeModal();
  };

  return (
    <div>
      <TopBar
        left={<IcLeftChevron />}
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
      <BottomSheet isOpen={isOpen} onClose={closeModal}>
        <IconPickerBottomSheetTemplate
          categories={ICON_OPTIONS}
          selectedId={tempIcon?.id}
          onSelect={setTempIcon}
          onConfirm={handleConfirm}
          onClose={closeModal}
        />
      </BottomSheet>
      <BottomFixedArea zIndex={-1}>
        <Button variant='primary' disabled={!categoryName || !selectedIcon} size='lg'>
          추가하기
        </Button>
      </BottomFixedArea>
    </div>
  );
};
