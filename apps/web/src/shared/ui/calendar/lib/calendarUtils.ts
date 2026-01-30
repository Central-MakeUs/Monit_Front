import {
  isSameDay,
  isToday as dateFnsIsToday,
  format,
  startOfMonth,
  getDay,
  getDaysInMonth,
  subMonths,
  addMonths,
  addDays,
  subDays,
  startOfWeek,
} from 'date-fns';

// Re-export date-fns functions
export { addMonths, subMonths, addDays, subDays };
export { isSameDay as isSameDate };
export { dateFnsIsToday as isToday };

/**
 * 년/월을 "YYYY년 M월" 형식으로 포맷
 */
export const formatYearMonth = (date: Date): string => {
  return format(date, 'yyyy년 M월');
};

export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
}

/**
 * 캘린더에 표시할 날짜 배열 생성 (이전 달, 현재 달, 다음 달 포함)
 */
export const generateCalendarDates = (currentDate: Date): CalendarDate[] => {
  const firstDay = startOfMonth(currentDate);
  const startDayOfWeek = (getDay(firstDay) + 6) % 7; // 월요일을 0으로
  const daysInMonth = getDaysInMonth(currentDate);

  // 이전 달 날짜 채우기
  const prevMonthDays: CalendarDate[] = [];
  const prevMonth = subMonths(currentDate, 1);
  const prevMonthLastDay = getDaysInMonth(prevMonth);

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    prevMonthDays.push({
      date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonthLastDay - i),
      isCurrentMonth: false,
    });
  }

  // 현재 달 날짜
  const currentMonthDays: CalendarDate[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push({
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
      isCurrentMonth: true,
    });
  }

  // 다음 달 날짜 채우기 (마지막 주 나머지 셀)
  const totalDaysSoFar = prevMonthDays.length + currentMonthDays.length;
  const remainingInLastWeek = totalDaysSoFar % 7 === 0 ? 0 : 7 - (totalDaysSoFar % 7);

  const nextMonthDays: CalendarDate[] = [];
  const nextMonth = addMonths(currentDate, 1);

  for (let i = 1; i <= remainingInLastWeek; i++) {
    nextMonthDays.push({
      date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i),
      isCurrentMonth: false,
    });
  }

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};

/**
 * 주간 캘린더에 표시할 날짜 배열 생성 (월~일 7일)
 * @param baseDate 기준 날짜 (이 날짜가 포함된 주의 월~일을 반환)
 */
export const generateWeeklyDates = (baseDate: Date): CalendarDate[] => {
  // 월요일을 주의 시작으로 설정
  const weekStart = startOfWeek(baseDate, { weekStartsOn: 1 });

  const weekDates: CalendarDate[] = [];

  // 월요일부터 일요일까지 7일 생성
  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStart, i);
    weekDates.push({
      date,
      isCurrentMonth: date.getMonth() === baseDate.getMonth(),
    });
  }

  return weekDates;
};
