'use client';
import React from 'react';
import * as styles from './CategoryManagement.css';
import { TopBar, vars, Text, CategoryBtn } from '@/shared/ui';
import { IcLeftChevron, IcPlusCircle } from 'public/icons';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useQuery } from '@tanstack/react-query';
import { categoryQueries } from '@/features/expense/model/categoryQueries';
import type { CategoryListResponseDTO } from '@/features/expense/model/types';
import { CategoryOnboardingTour } from '@/features/onboarding';

const SortableCategoryItem = ({
  category,
  onClick,
  onboardingId,
}: {
  category: CategoryListResponseDTO;
  onClick: () => void;
  onboardingId?: string;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: category.id,
  });

  const inlineStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={isDragging ? styles.sortableItem.dragging : styles.sortableItem.default}
      style={inlineStyle}
      {...attributes}
      {...listeners}>
      <CategoryBtn
        icon={category.icon ?? 'coin'}
        label={category.name}
        type='secondary'
        data-onboarding-id={onboardingId}
        onClick={onClick}
      />
    </div>
  );
};

export const CategoryManagement = () => {
  const router = useRouter();
  const { data: categoryData } = useQuery(categoryQueries.listQuery());
  const categories = categoryData?.result ?? [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // TODO: 서버에 순서 저장 API 연결
    }
  };

  const validCategories = categories.filter(
    (c): c is typeof c & { id: number } => c.id !== undefined && c.id !== null
  );

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
          <div data-onboarding-id='category-add-btn'>
            <IcPlusCircle
              color={vars.color.icon.tertiary}
              onClick={() => router.push('/expense/category?from=mypage')}
            />
          </div>
        }
      />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={validCategories.map((c) => c.id)} strategy={rectSortingStrategy}>
          <div className={styles.categoryGrid}>
            {validCategories.map((category, index) => (
              <SortableCategoryItem
                key={category.id}
                category={category}
                onboardingId={index === 0 ? 'category-first-item' : undefined}
                onClick={() => {
                  router.push(`/expense/category?mode=edit&id=${category.id}&from=mypage`);
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <CategoryOnboardingTour />
    </div>
  );
};
