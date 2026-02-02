'use client';

import { MenuItem, MenuLabel, Divider } from '@/features/my';
import { TopBar, vars, Text } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import React from 'react';
import * as styles from './myPage.css';

export const MyPage = () => {
  return (
    <div>
      <TopBar
        left={<IcLeftChevron />}
        center={
          <Text variant='t1' color={vars.color.text.primary}>
            마이페이지
          </Text>
        }
      />
      <div className={styles.container}>
        {/* 서비스 */}
        <MenuLabel label='서비스' />
        <MenuItem type='arrow' label='카테고리 편집' />
        <Divider />
        {/* 약관 */}
        <MenuLabel label='약관' />
        <MenuItem type='arrow' label='서비스 이용약관' />
        <MenuItem type='arrow' label='개인정보 수집 및 이용 동의' />
        <MenuItem type='toggle' label='개인정보 수집 및 이용 동의' />
        <Divider />

        {/* 계정 설정 */}
        <MenuLabel label='계정 설정' />
        <MenuItem type='arrow' label='1:1문의' />
        <MenuItem label='로그아웃' />
        <MenuItem label='회원탈퇴' />
      </div>
    </div>
  );
};
