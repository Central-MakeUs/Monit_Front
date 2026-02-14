'use client';

import { MenuItem, MenuLabel } from '@/features/my';
import { useLogout, useWithdraw } from '@/features/auth';
import { EXTERNAL_URLS } from '@/shared/constants/urls';
import { TopBar, vars, Text, Divider, AlertDialog } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import React from 'react';
import * as styles from './myPage.css';
import { useRouter } from 'next/navigation';
import { useModal } from '@/shared/hooks';
import { useBridge } from '@/shared/lib/bridge';

export const MyPage = () => {
  const router = useRouter();
  const bridge = useBridge();

  const handleExternalUrl = (url: string) => {
    bridge?.openExternalUrl(url);
  };
  const { handleLogout, isPending: isLogoutPending } = useLogout();
  const { handleWithdraw, isPending: isWithdrawPending } = useWithdraw();
  const {
    isOpen: isLogoutOpen,
    openModal: openLogoutModal,
    closeModal: closeLogoutModal,
  } = useModal();
  const {
    isOpen: isWithdrawOpen,
    openModal: openWithdrawModal,
    closeModal: closeWithdrawModal,
  } = useModal();

  return (
    <div>
      <TopBar
        left={<IcLeftChevron onClick={() => router.back()} />}
        center={
          <Text variant='t1' color={vars.color.text.primary}>
            마이페이지
          </Text>
        }
      />
      <div className={styles.container}>
        {/* 서비스 */}
        {/* TODO: 카테고리 관리 페이지 만들면 주석 해제 */}
        {/* <MenuLabel label='서비스' />
        <MenuItem type='arrow' label='카테고리 관리' onClick={() => router.push('/my/category')} />
        <div className={styles.dividerWrapper}>
          <Divider />
        </div> */}

        {/* 약관 */}
        <MenuLabel label='약관' />
        <MenuItem
          type='arrow'
          label='서비스 이용약관'
          onClick={() => handleExternalUrl(EXTERNAL_URLS.TERMS_OF_SERVICE)}
        />
        <MenuItem
          type='arrow'
          label='개인정보 수집 및 이용 동의'
          onClick={() => handleExternalUrl(EXTERNAL_URLS.PRIVACY_POLICY)}
        />
        {/*  */}
        {/* <MenuItem type='toggle' label='알림 설정 허용' /> */}
        <div className={styles.dividerWrapper}>
          <Divider />
        </div>

        {/* 계정 설정 */}
        <MenuLabel label='계정 설정' />
        <MenuItem type='arrow' label='1:1문의' onClick={() => router.push('/my/support')} />
        <MenuItem label='로그아웃' onClick={openLogoutModal} />
        <MenuItem label='회원탈퇴' onClick={openWithdrawModal} />
      </div>
      <AlertDialog
        isOpen={isLogoutOpen}
        onClose={closeLogoutModal}
        variant='left'
        title='로그아웃 하시겠어요?'
        description='로그인 화면으로 돌아가요.'
        cancelText='취소'
        confirmText='로그아웃'
        onCancel={closeLogoutModal}
        onConfirm={handleLogout}
        isConfirmDisabled={isLogoutPending}
      />
      <AlertDialog
        isOpen={isWithdrawOpen}
        onClose={closeWithdrawModal}
        variant='left'
        title='정말 탈퇴하시겠어요?'
        description={
          <>
            <span style={{ color: vars.color.text.primary }}>지금까지 작성한 소비 기록</span>이 모두
            삭제되며,
            <br />한 번 삭제된 데이터는 다시 복구할 수 없어요.
          </>
        }
        cancelText='취소'
        confirmText='탈퇴'
        onCancel={closeWithdrawModal}
        onConfirm={handleWithdraw}
        isConfirmDisabled={isWithdrawPending}
      />
    </div>
  );
};
