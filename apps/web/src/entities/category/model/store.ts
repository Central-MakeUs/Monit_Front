import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const PINNED_CATEGORY_LIMIT = 7;

interface CategoryPinnedStore {
  pinnedCategoryIds: number[] | null;
  setPinnedCategoryIds: (ids: number[]) => void;
  selectCategory: (id: number) => void;
  reorderCategories: (fromIndex: number, toIndex: number) => void;
}

export const useCategoryStore = create<CategoryPinnedStore>()(
  persist(
    (set, get) => ({
      pinnedCategoryIds: null,
      setPinnedCategoryIds: (ids) => {
        const current = get().pinnedCategoryIds;
        if (current === null) {
          set({ pinnedCategoryIds: ids.slice(0, PINNED_CATEGORY_LIMIT) });
          return;
        }
        // 기존 순서 유지, 새 ID만 뒤에 추가 (기존 ID 제거하지 않음)
        const newIds = ids.filter((id) => !current.includes(id));
        set({ pinnedCategoryIds: [...current, ...newIds].slice(0, PINNED_CATEGORY_LIMIT) });
      },
      selectCategory: (id) => {
        const { pinnedCategoryIds } = get();
        const current = pinnedCategoryIds ?? [];
        if (current.includes(id)) return;
        const newIds = [id, ...current.slice(0, PINNED_CATEGORY_LIMIT - 1)];
        set({ pinnedCategoryIds: newIds });
      },
      reorderCategories: (fromIndex, toIndex) =>
        set((state) => {
          const newIds = [...(state.pinnedCategoryIds ?? [])];
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
