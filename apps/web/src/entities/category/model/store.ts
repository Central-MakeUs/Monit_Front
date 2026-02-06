import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CategoryListResponseDTO } from './categoryTypes';

const DISPLAY_CATEGORY_LIMIT = 7;

const toDisplayIds = (categories: CategoryListResponseDTO[]) =>
  categories
    .filter((c): c is CategoryListResponseDTO & { id: number } => c.id != null)
    .slice(0, DISPLAY_CATEGORY_LIMIT)
    .map((c) => c.id);

interface CategoryStore {
  categories: CategoryListResponseDTO[];
  displayCategoryIds: number[]; // 홈에 보여줄 카테고리 ID 목록 (최대 7개)
  setCategories: (categories: CategoryListResponseDTO[]) => void;
  addCategory: (category: CategoryListResponseDTO) => void;
  updateCategory: (id: number, category: Partial<CategoryListResponseDTO>) => void;
  removeCategory: (id: number) => void;
  clearCategories: () => void;

  // 카테고리 선택 시: 홈에 없는 카테고리면 맨 앞으로
  selectCategory: (id: number) => void;
}

// 임시ㅇ
const initialCategories: CategoryListResponseDTO[] = [
  { id: 1, name: '간식', icon: 'shopping' },
  { id: 2, name: '자기계발비', icon: 'coin' },
  { id: 3, name: '할인', icon: 'percent' },
  { id: 4, name: '쇼핑', icon: 'shopping' },
  { id: 5, name: '저축', icon: 'coin' },
  { id: 6, name: '교통비', icon: 'shopping' },
  { id: 7, name: '식비', icon: 'percent' },
  { id: 8, name: '통신비', icon: 'coin' },
  { id: 9, name: '의료비', icon: 'shopping' },
  { id: 10, name: '보험', icon: 'percent' },
  { id: 11, name: '여가', icon: 'coin' },
  { id: 12, name: '문화생활', icon: 'shopping' },
  { id: 13, name: '교육', icon: 'percent' },
  { id: 14, name: '경조사', icon: 'coin' },
  { id: 15, name: '반려동물', icon: 'shopping' },
  { id: 16, name: '기타', icon: 'percent' },
];

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set, get) => ({
      categories: initialCategories,
      displayCategoryIds: toDisplayIds(initialCategories),
      setCategories: (categories) =>
        set({
          categories,
          displayCategoryIds: toDisplayIds(categories),
        }),
      addCategory: (category) =>
        set((state) => ({
          categories: [category, ...state.categories],
          displayCategoryIds:
            category.id == null
              ? state.displayCategoryIds
              : [category.id, ...state.displayCategoryIds.slice(0, DISPLAY_CATEGORY_LIMIT - 1)],
        })),
      updateCategory: (id, category) =>
        set((state) => ({
          categories: state.categories.map((c) => (c.id === id ? { ...c, ...category } : c)),
        })),
      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
          displayCategoryIds: state.displayCategoryIds.filter((cId) => cId !== id),
        })),
      clearCategories: () => set({ categories: [], displayCategoryIds: [] }),
      selectCategory: (id) => {
        const { displayCategoryIds } = get();
        // 이미 홈에 있으면 순서 변화 없음
        if (displayCategoryIds.includes(id)) return;
        // 홈에 없으면 맨 앞에 추가하고 마지막 하나 제거
        const newIds = [id, ...displayCategoryIds.slice(0, DISPLAY_CATEGORY_LIMIT - 1)];
        set({ displayCategoryIds: newIds });
      },
    }),
    {
      name: 'category-storage',
    }
  )
);
