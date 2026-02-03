'use client';

import { MenuItem, MenuLabel, Divider } from '@/features/my';
import { TopBar, vars, Text } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import React from 'react';
import * as styles from './myPage.css';
import { useRouter } from 'next/navigation';

export const MyPage = () => {
  const router = useRouter();
  // TODO: 페이지 만들면 router 아래 모두 수정
  // TODO: 이용 동의 API 연동
  // TODO: 로그아웃, 탈퇴 모달 창
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
        <Divider />
        {/* 약관 */}
        <MenuLabel label='약관' />
        <MenuItem type='arrow' label='서비스 이용약관' onClick={() => router.push('/')} />
        <MenuItem
          type='arrow'
          label='개인정보 수집 및 이용 동의'
          onClick={() => router.push('/')}
        />
        <MenuItem type='toggle' label='개인정보 수집 및 이용 동의' />
        <Divider />

        {/* 계정 설정 */}
        <MenuLabel label='계정 설정' />
        <MenuItem type='arrow' label='1:1문의' onClick={() => router.push('/')} />
        <MenuItem label='로그아웃' />
        <MenuItem label='회원탈퇴' />
      </div>
    </div>
  );
};
