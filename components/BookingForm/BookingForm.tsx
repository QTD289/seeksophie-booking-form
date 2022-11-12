import { FaCreditCard } from 'react-icons/fa';

import { useFormStore } from 'stores';

import { Addon, DateTimeSelect, PersonsNo } from './components';

export const BookingForm = (): JSX.Element => {
  const { maxPersonsNo } = useFormStore();

  return (
    <div className="booking-form">
      <div className="header">Booking for maximum {maxPersonsNo} persons</div>

      <PersonsNo />

      <DateTimeSelect />

      <Addon />

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
