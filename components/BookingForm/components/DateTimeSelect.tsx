import { useEffect } from 'react';

import classNames from 'classnames';
import { FaCalendarAlt } from 'react-icons/fa';

import { Calendar } from 'Calendar';
import { useFormStore } from 'stores';

export const DateTimeSelect = (): JSX.Element => {
  const { init, bookingDate, bookingTime, showingCalendar, toggleCalendar } =
    useFormStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="dateTimeSelect">
      <div
        className={classNames('field calendar', {
          selected: bookingDate && bookingTime,
        })}
        onClick={toggleCalendar}
      >
        <div className="icon">
          <FaCalendarAlt />
        </div>
        {bookingDate && bookingTime ? (
          <div className="selectedDateTime">{`${bookingDate.toLocaleDateString(
            'en-US'
          )} • ${bookingTime.start} - ${bookingTime.end}`}</div>
        ) : (
          <div className="placeholder">Select Date & Time</div>
        )}
      </div>

      {showingCalendar && (
        <div className="calendarWrapper">
          <Calendar />
        </div>
      )}
    </div>
  );
};
