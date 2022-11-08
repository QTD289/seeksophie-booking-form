import { FaCalendarAlt } from 'react-icons/fa';

export const Calendar = (): JSX.Element => {
  return (
    <div className="field calendar">
      <div className="icon">
        <FaCalendarAlt />
      </div>
      <div className="placeholder">Select Date & Time</div>
    </div>
  );
};
