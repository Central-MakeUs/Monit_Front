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
 * 주어진 날짜가 오늘 이후인지 확인 (미래 날짜인지)
 */
export const isAfterToday = (date: Date): boolean => {
  const today = new Date();
  const todayTime = today.setHours(0, 0, 0, 0);
  const dateTime = new Date(date).setHours(0, 0, 0, 0);

  return dateTime > todayTime;
};

/**
 * 주어진 날짜가 현재 월 이후인지 확인
 */
export const isAfterCurrentMonth = (date: Date): boolean => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const targetYear = date.getFullYear();
  const targetMonth = date.getMonth();

  return targetYear > currentYear || (targetYear === currentYear && targetMonth > currentMonth);
};

/**
 * 주어진 날짜(baseDate)가 포함된 주가 오늘을 포함하는지 확인
 * @param baseDate 확인할 주의 기준 날짜
 * @returns 해당 주가 오늘을 포함하면 true
 */
export const isCurrentWeek = (baseDate: Date): boolean => {
  const today = new Date();
  const weekStart = startOfWeek(baseDate, { weekStartsOn: 1 });
  const weekEnd = addDays(weekStart, 6);

  // 오늘이 해당 주의 시작일과 종료일 사이에 있는지 확인
  const todayTime = today.setHours(0, 0, 0, 0);
  const weekStartTime = weekStart.setHours(0, 0, 0, 0);
  const weekEndTime = weekEnd.setHours(23, 59, 59, 999);

  return todayTime >= weekStartTime && todayTime <= weekEndTime;
};

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
