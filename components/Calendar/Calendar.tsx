import { useCallback, useMemo, useState } from 'react';

import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { CalendarDayCell } from './CalendarDayCell';

// REF: https://dev.to/franciscomendes10866/how-to-build-a-custom-calendar-component-in-react-26kj
export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const currentDay = useMemo(() => dayjs().toDate(), []);

  const firstDayOfTheMonth = useMemo(
    () => selectedDate.clone().startOf('month'),
    [selectedDate]
  );

  const firstDayOfFirstWeekOfMonth = useMemo(
    () => dayjs(firstDayOfTheMonth).startOf('week'),
    [firstDayOfTheMonth]
  );

  const generateFirstDayOfEachWeek = useCallback((day: Dayjs): Dayjs[] => {
    const dates: Dayjs[] = [day];
    for (let i = 1; i < 6; i++) {
      const date = day.clone().add(i, 'week');
      dates.push(date);
    }
    return dates;
  }, []);

  const generateWeek = useCallback((day: Dayjs): Date[] => {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = day.clone().add(i, 'day').toDate();
      dates.push(date);
    }
    return dates;
  }, []);

  const generateWeeksOfTheMonth = useMemo((): Date[][] => {
    const firstDayOfEachWeek = generateFirstDayOfEachWeek(
      firstDayOfFirstWeekOfMonth
    );
    return firstDayOfEachWeek.map((date) => generateWeek(date));
  }, [generateFirstDayOfEachWeek, firstDayOfFirstWeekOfMonth, generateWeek]);

  const onPrevMonth = () => {
    if (selectedDate.month() === currentDay.getMonth()) return;
    setSelectedDate((date) => date.subtract(1, 'month'));
  };

  const onNextMonth = () => {
    if (selectedDate.month() === currentDay.getMonth() + 1) return;
    setSelectedDate((date) => date.add(1, 'month'));
  };

  return (
    <div className="calendar">
      <div className="MainWrapper">
        <div className="CalendarHeaderWrapper">
          <div
            className={classNames('switchMonth', {
              disabled: selectedDate.month() === currentDay.getMonth(),
            })}
          >
            <FaChevronLeft size={20} onClick={onPrevMonth} />
          </div>
          <h3>{selectedDate.clone().format('MMM YYYY')}</h3>
          <div
            className={classNames('switchMonth', {
              disabled: selectedDate.month() === currentDay.getMonth() + 1,
            })}
          >
            <FaChevronRight size={20} onClick={onNextMonth} />
          </div>
        </div>
        <div className="WeekDaysWrapper">
          {generateWeeksOfTheMonth[0].map((day, index) => (
            <div className="WeekDayCell" key={`week-day-${index}`}>
              {dayjs(day).format('dd')}
            </div>
          ))}
        </div>
        {generateWeeksOfTheMonth.map((week, weekIndex) => (
          <div className="CalendarContentWrapper" key={`week-${weekIndex}`}>
            {week.map((day, dayIndex) => (
              <CalendarDayCell
                key={`day-${dayIndex}`}
                selectedDate={selectedDate}
                currentDay={currentDay}
                day={day}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
