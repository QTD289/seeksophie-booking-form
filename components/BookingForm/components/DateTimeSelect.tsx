import { useEffect } from 'react';

import { FaCalendarAlt } from 'react-icons/fa';

import { Calendar } from 'Calendar';
import { useFormStore } from 'stores';

export const DateTimeSelect = (): JSX.Element => {
  const { init } = useFormStore();

  useEffect(() => {
    init();
  }, [init]);

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
