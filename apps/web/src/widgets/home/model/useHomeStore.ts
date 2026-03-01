import { create } from 'zustand';
import { ViewMode } from './types';

interface HomeState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  viewMode: 'list',
  setViewMode: (mode) => set({ viewMode: mode }),
}));
