'use client';
import React from 'react';
import * as styles from './CategoryManagement.css';
import { TopBar, vars, Text, CategoryBtn } from '@/shared/ui';
import { IcLeftChevron, IcPlusCircle } from 'public/icons';
import { useRouter } from 'next/navigation';
import { useCategoryStore } from '@/entities/category/model/store';

export const CategoryManagement = () => {
  const router = useRouter();
  const { categories } = useCategoryStore();

  return (
    <div>
      <TopBar
        left={<IcLeftChevron onClick={() => router.back()} />}
        center={
          <Text variant='t1' color={vars.color.text.primary}>
            카테고리 관리
          </Text>
        }
        right={
          <IcPlusCircle
            color={vars.color.icon.tertiary}
            onClick={() => router.push('/expense/category?from=mypage')}
          />
        }
      />
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <CategoryBtn
            key={category.id}
            icon={category.icon ?? 'coin'}
            label={category.name}
            type='secondary'
          />
        ))}
      </div>
    </div>
  );
};
