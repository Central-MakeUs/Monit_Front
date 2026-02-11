import React from 'react';
import * as styles from './ExpenseFormBottomSheet.css';
import {
  Button,
  BaseBottomSheetTemplate,
  EditableTextInput,
  InputField,
  TextInput,
  CategoryIconType,
  CategoryGrid,
  DateInfoField,
  Text,
  vars,
  Badge,
  Divider,
} from '@/shared/ui';

import { IcTrash } from 'public/icons';
import { formatDate } from '@/shared/utils';
export interface Category {
  id: string;
  icon: CategoryIconType;
  label: string;
}

export interface ExpenseFormBottomSheetProps {
  /** 소비 금액 */
  amount?: number;
  /** 소비 금액 변경 콜백 */
  onAmountChange?: (value: string) => void;
  /** 사용처 */
  usage?: string;
  /** 사용처 변경 콜백 */
  onUsageChange?: (value: string) => void;
  /** 선택된 날짜 */
  selectedDate?: Date;
  /** 날짜 선택 클릭 콜백 */
  onDateClick?: () => void;
  /** 카테고리 목록 */
  categories?: Category[];
  /** 선택된 카테고리 ID */
  selectedCategoryId?: string | null;
  /** 카테고리 선택 시 콜백 */
  onCategorySelect?: (category: Category) => void;
  /** 더보기 버튼 클릭 시 콜백 */
  onMoreCategoryClick?: () => void;
  /** 만족도 라벨 */
  satisfactionLabel?: string; //TODO: 임시
  /** 만족도 이모지 */
  satisfactionEmoji?: string; //TODO: 임시
  /** 삭제 버튼 클릭 시 콜백 */
  onDelete?: () => void;
  /** 선택 버튼 클릭 시 콜백 */
  onConfirm?: () => void;
  /** X 버튼 클릭 시 콜백 */
  onClose?: () => void;
  /** 확인 버튼 비활성화 여부 */
  confirmDisabled?: boolean;
}

export const ExpenseFormBottomSheet = ({
  amount,
  onAmountChange,
  usage,
  onUsageChange,
  selectedDate = new Date(),
  onDateClick,
  categories,
  selectedCategoryId,
  onCategorySelect,
  onMoreCategoryClick,
  onDelete,
  onConfirm,
  onClose,
  confirmDisabled,
}: ExpenseFormBottomSheetProps) => {
  return (
    <BaseBottomSheetTemplate>
      <BaseBottomSheetTemplate.Header type='close' onClose={onClose} />

      {/* 소비금액 */}
      <InputField label='소비금액'>
        <EditableTextInput
          value={amount?.toString()}
          onValueChange={onAmountChange}
          fieldType='number'
        />
      </InputField>

      {/* 사용처 */}
      <div>
        <InputField label='사용처'>
          <TextInput
            placeholder='사용처를 입력해주세요'
            value={usage}
            onValueChange={onUsageChange}
          />
        </InputField>
      </div>

      {/* 소비일 */}
      <DateInfoField label='소비일' value={formatDate(selectedDate)} onClick={onDateClick} />

      <Divider color='#E8E8E8' />

      {/* 카테고리 */}
      <CategoryGrid
        categories={categories ?? []}
        selectedId={selectedCategoryId}
        onSelect={onCategorySelect}
        onMoreClick={onMoreCategoryClick}
      />

      {/* 훌린듯이 소비 */}
      <div className={styles.badgeContainer}>
        <Text variant='b2' color={vars.color.text.secondary}>
          소비 상황
        </Text>
        <div className={styles.badgeList}>
          <Badge label={'홀린듯이'} />
          {/* <Badge label='정말 만족했어요' size='lg' evaluationType='VERY_SATISFIED' /> */}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className={styles.buttonSection}>
        <button className={styles.deleteButton} onClick={onDelete}>
          <IcTrash />
        </button>
        <Button variant='brand' onClick={onConfirm} disabled={confirmDisabled}>
          완료
        </Button>
      </div>
    </BaseBottomSheetTemplate>
  );
};
