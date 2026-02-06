'use client';

import { MenuItem, MenuLabel } from '@/features/my';
import { TopBar, vars, Text, Divider, AlertDialog, useToast } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import React from 'react';
import * as styles from './myPage.css';
import { useRouter } from 'next/navigation';
import { useModal } from '@/shared/hooks';

export const MyPage = () => {
  const router = useRouter();
  const toast = useToast();
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

  // TODO: 페이지 만들면 router 아래 모두 수정
  // TODO: 알림 설정
  const handleLogout = () => {
    // TODO: 로그아웃 API 연동
    toast.success('로그아웃이 완료되었어요');
    router.push('/');
  };

  const handleWithdraw = () => {
    // TODO: 회원탈퇴 API 연동
    toast.success('회원탈퇴가 완료되었어요');
    router.push('/');
  };

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
        <MenuLabel label='서비스' />
        <MenuItem
          type='arrow'
          label='카테고리 편집'
          onClick={() => router.push('/expense/category')}
        />
        <div className={styles.dividerWrapper}>
          <Divider />
        </div>

        {/* 약관 */}
        <MenuLabel label='약관' />
        <MenuItem
          type='arrow'
          label='서비스 이용약관'
          onClick={() =>
            window.open('https://www.notion.so/1-0-2e214c814b498037a7f1d4905a2aa4ce', '_blank')
          }
        />
        <MenuItem
          type='arrow'
          label='개인정보 수집 및 이용 동의'
          onClick={() =>
            window.open(
              'https://wise-sunspot-cba.notion.site/1-0-2e214c814b4980358041edd610580fca',
              '_blank'
            )
          }
        />
        <MenuItem type='toggle' label='알림 설정 허용' />
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
      />
      <AlertDialog
        isOpen={isWithdrawOpen}
        onClose={closeWithdrawModal}
        variant='left'
        title='정말 탈퇴하시겠어요?'
        description={`작성한 소비 기록이 모두 삭제되며,\n한 번 삭제된 데이터는 다시 복구할 수 없어요.`}
        cancelText='취소'
        confirmText='탈퇴'
        onCancel={closeWithdrawModal}
        onConfirm={handleWithdraw}
      />
    </div>
  );
};
