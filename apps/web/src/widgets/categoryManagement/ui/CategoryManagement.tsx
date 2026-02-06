'use client';
import React, { useState, useEffect } from 'react';
import * as styles from './CategoryManagement.css';
import { TopBar, vars, Text, CategoryBtn, Tooltip } from '@/shared/ui';
import { IcLeftChevron, IcPlusCircle } from 'public/icons';
import { useRouter } from 'next/navigation';
import { useCategoryStore } from '@/entities/category/model/store';
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
import { CategoryListResponseDTO } from '@/entities/category/model/categoryTypes';

const ONBOARDING_KEY = 'category-management-onboarding-completed';

const SortableCategoryItem = ({
  category,
  onClick,
  highlighted,
}: {
  category: CategoryListResponseDTO;
  onClick: () => void;
  highlighted?: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: category.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CategoryBtn
        icon={category.icon ?? 'coin'}
        label={category.name}
        type='secondary'
        highlighted={highlighted}
        onClick={onClick}
      />
    </div>
  );
};

export const CategoryManagement = () => {
  const router = useRouter();
  const { categories, reorderCategories } = useCategoryStore();
  const [onboardingStep, setOnboardingStep] = useState<number | null>(null);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem(ONBOARDING_KEY) === 'true';
    if (!hasSeenOnboarding) {
      setOnboardingStep(1);
    }
  }, []);

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
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);

      reorderCategories(oldIndex, newIndex);
    }
  };

  const handleOverlayClick = () => {
    if (onboardingStep === 1) {
      setOnboardingStep(2);
    } else if (onboardingStep === 2) {
      setOnboardingStep(null);
      localStorage.setItem(ONBOARDING_KEY, 'true');
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
          <div className={onboardingStep === 2 ? styles.highlightAddButton : undefined}>
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
                highlighted={onboardingStep === 1 && index === 0}
                onClick={() => {
                  if (onboardingStep) return;
                  router.push(`/expense/category?mode=edit&id=${category.id}&from=mypage`);
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* 온보딩 오버레이 */}
      {onboardingStep !== null && (
        <div className={styles.onboardingOverlay} onClick={handleOverlayClick}>
          {onboardingStep === 1 && (
            <Tooltip
              className={styles.tooltipStep1}
              arrow='left'
              direction='top'
              title='카테고리 수정하기'
              step='(1/2)'
              description='카테고리의 이름과 아이콘을 수정할 수 있어요'
            />
          )}
          {onboardingStep === 2 && (
            <Tooltip
              className={styles.tooltipStep2}
              arrow='top'
              direction='right'
              title='카테고리 추가하기'
              step='(2/2)'
              description='새로운 카테고리를 추가할 수 있어요'
            />
          )}
        </div>
      )}
    </div>
  );
};
