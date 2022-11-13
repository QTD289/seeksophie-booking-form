import { Price, TimeSlot } from 'BookingForm/interface';

export const SAMPLE_TIME_SLOTS: TimeSlot[] = [
  {
    maximumPersons: 4,
    start: '7am',
    end: '9am',
  },
  {
    maximumPersons: 5,
    start: '9am',
    end: '11am',
  },
  {
    maximumPersons: 8,
    start: '1pm',
    end: '3pm',
  },
  {
    maximumPersons: 10,
    start: '3pm',
    end: '5pm',
  },
];

export const SAMPLE_PRICES: Price[] = [
  {
    min: 0,
    max: 4,
    price: 100,
  },
  {
    min: 5,
    price: 80,
  },
];
