import { create } from 'zustand';

interface DateState {
  currentDate: Date;
  selectedDate: Date | null;
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: Date | null) => void;
  setDateFromPicker: (year: number, month: number) => void;
}

export const useDateStore = create<DateState>((set, get) => ({
  currentDate: new Date(),
  selectedDate: new Date(),
  setCurrentDate: (date) => {
    set({ currentDate: new Date(date.getTime()) });
  },
  setSelectedDate: (date) => set({ selectedDate: date ? new Date(date.getTime()) : null }),
  setDateFromPicker: (year, month) => {
    const currentSelected = get().selectedDate;
    const currentDay = currentSelected ? currentSelected.getDate() : 1;

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    const validDay = Math.min(currentDay, lastDayOfMonth);

    let newSelectedDate = new Date(year, month - 1, validDay);

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
