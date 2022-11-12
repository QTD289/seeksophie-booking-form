import { FaCalendarAlt } from 'react-icons/fa';

import { Calendar } from 'Calendar';

export const DateTimeSelect = (): JSX.Element => {
  return (
    <div className="dateTimeSelect">
      <div className="field calendar">
        <div className="icon">
          <FaCalendarAlt />
        </div>
        <div className="placeholder">Select Date & Time</div>
      </div>

      <Calendar />
    </div>
  );
};
