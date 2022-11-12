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
  const { dailyPrices } = useFormStore();
  const { selectedDate, currentDay, day } = props;

  const [showingTimeSlots, setShowingTimeSlots] = useState(false);

  const monthIndex = day.getMonth() - 10;
  const dailyPrice = dailyPrices[monthIndex * 30 + day.getDate() - 1];

  const isToday = dayjs(currentDay).isSame(day, 'date');
  const isDefault = selectedDate.clone().toDate().getMonth() === day.getMonth();
  const isNextMonth =
    selectedDate.clone().toDate().getMonth() !== day.getMonth();
  const isPast = dayjs(currentDay).isAfter(day, 'date');
  const isNotAvailable = dailyPrice?.timeSlots.length < 1;

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(wrapperRef, () => setShowingTimeSlots(false));

  const toggleDropdown = () => {
    !isNextMonth && setShowingTimeSlots(true);
  };

  return (
    <div
      className={classNames('CalendarDayCell', {
        default: isDefault,
        nextMonth: isNextMonth,
        today: isToday,
        past: isPast,
        notAvailable: isNotAvailable,
      })}
      ref={wrapperRef}
      onClick={toggleDropdown}
    >
      <div>{day.getDate()}</div>
      {monthIndex >= 0 && dailyPrice && (
        <>
          <div className="minPrice">${dailyPrice.dayMinPrice}</div>
          <div
            className={classNames('dropDown', { showing: showingTimeSlots })}
          >
            {dailyPrice.timeSlots.map((slot, index) => (
              <div className="slot" key={`time-${monthIndex}-${index}`}>
                {slot.start} - {slot.end} - {slot.maximumPersons}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};