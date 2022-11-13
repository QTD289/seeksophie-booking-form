import { FaCreditCard } from 'react-icons/fa';

import { useFormStore } from 'stores';

import { Addon, DateTimeSelect, PersonsNo } from './components';
import { ErrorType } from './interface';

export const BookingForm = (): JSX.Element => {
  const { maxPersonsNo, minimumPrice, error, book, totalPrice, perPrice } =
    useFormStore();

  return (
    <div className="booking-form">
      <div className="header">Booking for maximum {maxPersonsNo} persons</div>

      <PersonsNo />
      {error[ErrorType.PersonsNo] && (
        <div className="error">{error[ErrorType.PersonsNo]}</div>
      )}

      <DateTimeSelect />
      {error[ErrorType.DateTime] && (
        <div className="error">{error[ErrorType.DateTime]}</div>
      )}

      <Addon />

      <div className="request">
        {totalPrice > 0 ? (
          <div className="total-price">
            <div className="per">
              <div>Price/person</div>
              <div>${perPrice}</div>
            </div>
            <div className="total">
              <div>Total</div>
              <div>${totalPrice}</div>
            </div>
          </div>
        ) : (
          <div className="min-price">
            From <span>${minimumPrice}</span>/person.
          </div>
        )}
        <div className="btn" onClick={book}>
          Request to Book
        </div>
        <div className="payment">
          <FaCreditCard />
          Your request will be confirmed within 24h. Your card will be charged
          on request confirmation.
        </div>
      </div>
    </div>
  );
};
