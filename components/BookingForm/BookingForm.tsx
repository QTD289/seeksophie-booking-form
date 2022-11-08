import {
  FaUser,
  FaCalendarAlt,
  FaCartPlus,
  FaCreditCard,
  FaRegMinusSquare,
  FaRegPlusSquare,
} from 'react-icons/fa';

export const BookingForm = (): JSX.Element => {
  return (
    <div className="booking-form">
      <div className="header">Booking Form</div>
      <div className="input">
        <div className="icon">
          <FaUser />
        </div>
        <div className="placeholder">Number of Persons</div>
        <div className="minus">
          <FaRegMinusSquare />
        </div>
        <input type="number" min="0" className="people-no" value="0" />
        <div className="plus">
          <FaRegPlusSquare />
        </div>
      </div>
      <div className="input">
        <div className="icon">
          <FaCalendarAlt />
        </div>
        <div className="placeholder">Select Date & Time</div>
      </div>
      <div className="input">
        <div className="icon">
          <FaCartPlus />
        </div>
        <div className="placeholder">Select Add-on(s)</div>
      </div>

      <div className="request">
        <div className="min-price">
          From <span>S$ 599 / group of 10</span>
        </div>
        <div className="btn">Request to Book</div>
        <div className="payment">
          <FaCreditCard />
          Your request will be confirmed within 24h. Your card will be charged
          on request confirmation.
        </div>
      </div>
    </div>
  );
};
