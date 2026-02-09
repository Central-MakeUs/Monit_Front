import { create } from 'zustand';
import { ViewMode } from './types';

interface HomeState {
  currentDate: Date;
  selectedDate: Date | null;
  viewMode: ViewMode;
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: Date | null) => void;
  setViewMode: (mode: ViewMode) => void;
  setDateFromPicker: (year: number, month: number) => void;
}

export const useHomeStore = create<HomeState>((set, get) => ({
  currentDate: new Date(),
  selectedDate: new Date(),
  viewMode: 'list',
  setCurrentDate: (date) => {
    // 단순히 currentDate만 업데이트
    // 미래 날짜 검증은 각 캘린더 훅에서 처리
    set({ currentDate: new Date(date.getTime()) });
  },
  setSelectedDate: (date) => set({ selectedDate: date ? new Date(date.getTime()) : null }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setDateFromPicker: (year, month) => {
    const currentSelected = get().selectedDate;
    const currentDay = currentSelected ? currentSelected.getDate() : 1;

    // 선택된 월의 마지막 날짜를 확인
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    const validDay = Math.min(currentDay, lastDayOfMonth);

    // 새로운 날짜 생성
    let newSelectedDate = new Date(year, month - 1, validDay);

    // 미래 날짜 제한: 오늘보다 미래인 경우 오늘 날짜로 설정
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    newSelectedDate.setHours(0, 0, 0, 0);

    if (newSelectedDate > today) {
      newSelectedDate = new Date(today);
    }

    const newCurrentDate = new Date(year, month - 1, 1);

    set({
      currentDate: newCurrentDate,
      selectedDate: newSelectedDate,
    });
  },
}));
