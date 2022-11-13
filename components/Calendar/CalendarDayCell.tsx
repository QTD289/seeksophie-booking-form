import { useRef, useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';

import { useOnClickOutside } from 'hooks';
import { useFormStore } from 'stores';

interface Props {
  selectedDate: dayjs.Dayjs;
  currentDay: Date;
  day: Date;
}

export const CalendarDayCell = (props: Props) => {
  const { dailyPrices, personsNo, selectDateTime, bookingDate } =
    useFormStore();
  const { selectedDate, currentDay, day } = props;

  const [showingTimeSlots, setShowingTimeSlots] = useState(false);

  const monthIndex = day.getMonth() - 10;
  const dailyPrice = dailyPrices[monthIndex * 30 + day.getDate() - 1];
  const timeSlots =
    dailyPrice?.timeSlots.filter((slot) => slot.maximumPersons >= personsNo) ||
    [];
  const prices = dailyPrice?.prices;

  const isToday = dayjs(currentDay).isSame(day, 'date');
  const isDefault = selectedDate.clone().toDate().getMonth() === day.getMonth();
  const isNextMonth =
    selectedDate.clone().toDate().getMonth() !== day.getMonth();
  const isPast = dayjs(currentDay).isAfter(day, 'date');
  const isNotAvailable = timeSlots.length < 1;
  const isSat = day.getDay() === 0;
  const isSun = day.getDay() === 6;

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(wrapperRef, () => setShowingTimeSlots(false));

  const toggleDropdown = () => {
    !isNextMonth && setShowingTimeSlots(true);
  };

  return (
    <div
      className={classNames('CalendarDayCellWrapper', {
        sat: isSat,
        sun: isSun,
      })}
      ref={wrapperRef}
    >
      <div
        className={classNames('CalendarDayCell', {
          default: isDefault,
          nextMonth: isNextMonth,
          today: isToday,
          past: isPast,
          notAvailable: isNotAvailable,
          selected: bookingDate?.toISOString() === day.toISOString(),
        })}
        onClick={toggleDropdown}
      >
        <div>{day.getDate()}</div>
        {dailyPrice && (
          <div className="minPrice">${dailyPrice.dayMinPrice}</div>
        )}
      </div>
      {monthIndex >= 0 && dailyPrice && (
        <div className={classNames('dropDown', { showing: showingTimeSlots })}>
          {timeSlots.map((slot, index) => (
            <div
              className="slot"
              key={`time-${monthIndex}-${index}`}
              onClick={() => {
                selectDateTime(day, slot, prices);
                setShowingTimeSlots(false);
              }}
            >
              {slot.start} - {slot.end}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
