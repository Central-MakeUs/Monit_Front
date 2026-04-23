import React from 'react';
import {
  baseBottomSheetTemplate,
  BottomSheetHeaderBtn,
  bottomSheetHeaderWrapper,
  bottomSheetButtonSection,
  bottomSheetButton,
  headerIcon,
  bottomSheetButtonWrapper,
} from './BaseBottomSheetTemplate.css';
import { Text } from '../../text';
import { vars } from '../../theme.css';
import { IcClear, IcPlusSimple } from 'public/icons';
import { Button } from '../../button';
import { useBottomSheetContext } from '../BottomSheetContext';

interface BottomSheetButtonProps {
  label: string;
  onClick?: () => void;
  isGradation?: boolean;
}
type headerType = 'add' | 'close';
interface BottomSheetHeaderProps {
  text?: string;
  type?: headerType;
  onClickAddBtn?: () => void;
}

const BaseBottomSheetTemplate = ({ children }: { children: React.ReactNode }) => {
  return <article className={baseBottomSheetTemplate}>{children}</article>;
};

const BottomSheetContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

const BottomSheetHeader = ({ text, type = 'close', onClickAddBtn }: BottomSheetHeaderProps) => {
  const { onClose } = useBottomSheetContext();
  return (
    <div className={bottomSheetHeaderWrapper}>
      <Text variant='t1' color={vars.color.text.primary}>
        {text}
      </Text>
      {type === 'close' ? (
        <IcClear className={headerIcon} color={vars.color.icon.subtle} onClick={onClose} />
      ) : (
        <div className={BottomSheetHeaderBtn} onClick={onClickAddBtn}>
          <IcPlusSimple className={headerIcon} color={vars.color.icon.subtle} />
          <Text variant='b4' color={vars.color.text.tertiary}>
            추가
          </Text>
        </div>
      )}
    </div>
  );
};

const BottomSheetButtonSection = ({ children }: { children: React.ReactNode }) => {
  return <div className={bottomSheetButtonSection}>{children}</div>;
};

const BottomSheetButton = ({
  label = '선택',
  onClick,
  isGradation = false,
}: BottomSheetButtonProps) => {
  return (
    <div className={isGradation ? bottomSheetButton : undefined}>
      <Button variant='brand' onClick={onClick}>
        {label}
      </Button>
    </div>
  );
};

const BottomSheetButtongradient = () => {
  return <div className={bottomSheetButtonWrapper} />;
};

BaseBottomSheetTemplate.Content = BottomSheetContent;
BaseBottomSheetTemplate.Header = BottomSheetHeader;
BaseBottomSheetTemplate.ButtonSection = BottomSheetButtonSection;
BaseBottomSheetTemplate.Button = BottomSheetButton;
BaseBottomSheetTemplate.Gradient = BottomSheetButtongradient;

export default BaseBottomSheetTemplate;
