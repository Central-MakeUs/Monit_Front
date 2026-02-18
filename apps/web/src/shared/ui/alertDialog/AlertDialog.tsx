'use client';

import React from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../button';

import * as styles from './AlertDialog.css';

export interface AlertDialogProps {
  /** 다이얼로그 열림 상태 */
  isOpen: boolean;
  /** 다이얼로그 닫기 핸들러 */
  onClose: () => void;
  /** 다이얼로그 타입: left (두 버튼), center (아이콘 + 단일 버튼) */
  variant?: 'left' | 'center';
  /** 제목 */
  title: string;
  /** 설명 */
  description?: React.ReactNode;
  /** 아이콘 (center variant에서 사용) */
  icon?: React.ReactNode;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 취소 버튼 텍스트 (left variant에서 사용) */
  cancelText?: string;
  /** 확인 버튼 클릭 핸들러 */
  onConfirm?: () => void;
  /** 취소 버튼 클릭 핸들러 */
  onCancel?: () => void;
  /** 확인 버튼 비활성화 */
  isConfirmDisabled?: boolean;
  /** 인라인 모드 (overlay 없이 다이얼로그만 렌더링, Storybook 미리보기용) */
  inline?: boolean;
}

// 다이얼로그 콘텐츠 영역 컴포넌트
const DialogContent = ({
  variant,
  icon,
  title,
  description,
}: Pick<AlertDialogProps, 'variant' | 'icon' | 'title' | 'description'>) => {
  const showIcon = variant === 'center' && icon;

  return (
    <div className={styles.contentWrapper({ variant })}>
      {showIcon && <div className={styles.iconWrapper({ variant })}>{icon}</div>}

      <h2 id='alert-dialog-title' className={styles.title}>
        {title}
      </h2>

      {description && (
        <p id='alert-dialog-description' className={styles.description({ variant })}>
          {description}
        </p>
      )}
    </div>
  );
};

// 버튼 그룹 컴포넌트
const DialogButtons = ({
  variant,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isConfirmDisabled,
}: Pick<AlertDialogProps, 'variant' | 'confirmText' | 'cancelText' | 'isConfirmDisabled'> & {
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const isDualButton = variant === 'left';

  if (isDualButton) {
    return (
      <div className={styles.buttonGroup.dual}>
        <Button variant='secondary' size='md' onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant='brand' size='md' onClick={onConfirm} disabled={isConfirmDisabled}>
          {confirmText}
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.buttonGroup.single}>
      <Button variant='brand' size='md' onClick={onConfirm} disabled={isConfirmDisabled}>
        {confirmText}
      </Button>
    </div>
  );
};

export const AlertDialog = ({
  isOpen,
  onClose,
  variant = 'left',
  title,
  description,
  icon,
  confirmText = '확인',
  cancelText = '나중에 하기',
  onConfirm,
  onCancel,
  isConfirmDisabled = false,
  inline = false,
}: AlertDialogProps): React.JSX.Element | null => {
  if (!isOpen) return null;

  // 이벤트 핸들러
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 다이얼로그 콘텐츠
  const dialogContent = (
    <div
      className={styles.dialogContainer({ variant })}
      role='alertdialog'
      aria-modal='true'
      aria-labelledby='alert-dialog-title'
      aria-describedby={description ? 'alert-dialog-description' : undefined}>
      <DialogContent variant={variant} icon={icon} title={title} description={description} />

      <DialogButtons
        variant={variant}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isConfirmDisabled={isConfirmDisabled}
      />
    </div>
  );

  // 인라인 모드: overlay 없이 다이얼로그만 렌더링
  if (inline) {
    return dialogContent;
  }

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      {dialogContent}
    </div>,
    document.body
  );
};
