import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const PINNED_CATEGORY_LIMIT = 7;

interface CategoryPinnedStore {
  pinnedCategoryIds: number[];
  setPinnedCategoryIds: (ids: number[]) => void;
  selectCategory: (id: number) => void;
  reorderCategories: (fromIndex: number, toIndex: number) => void;
}

export const useCategoryStore = create<CategoryPinnedStore>()(
  persist(
    (set, get) => ({
      pinnedCategoryIds: [],
      setPinnedCategoryIds: (ids) =>
        set({ pinnedCategoryIds: ids.slice(0, PINNED_CATEGORY_LIMIT) }),
      selectCategory: (id) => {
        const { pinnedCategoryIds } = get();
        if (pinnedCategoryIds.includes(id)) return;
        const newIds = [id, ...pinnedCategoryIds.slice(0, PINNED_CATEGORY_LIMIT - 1)];
        set({ pinnedCategoryIds: newIds });
      },
      reorderCategories: (fromIndex, toIndex) =>
        set((state) => {
          const newIds = [...state.pinnedCategoryIds];
          const [movedId] = newIds.splice(fromIndex, 1);
          if (movedId !== undefined) {
            newIds.splice(toIndex, 0, movedId);
          }
          return { pinnedCategoryIds: newIds };
        }),
    }),
    {
      name: 'category-storage',
    }
  )
);
