import create from 'zustand';

import {
  DailyPrice,
  ErrorType,
  FormError,
  Price,
  TimeSlot,
} from 'BookingForm/interface';

import { generateDailyPrices } from '../utils/mockData';

interface State {
  init: () => void;
  minimumPrice: number;
  dailyPrices: DailyPrice[];

  maxPersonsNo: number;
  personsNo: number;
  changePersonsNo: (value?: string | number) => void;

  bookingDate?: Date;
  bookingTime?: TimeSlot;
  bookingPrices?: Price[];
  selectDateTime: (date: Date, time: TimeSlot, prices: Price[]) => void;

  error: FormError;
  isValidated: () => boolean;
  book: () => void;

  perPrice: number;
  totalPrice: number;
  calculatePrice: () => void;
}

export const useFormStore = create<State>((set, get) => ({
  init: () => {
    const dailyPrices = generateDailyPrices();
    const minimumPrice = dailyPrices.reduce((min, price) => {
      if (price.dayMinPrice < min) return price.dayMinPrice;
      return min;
    }, dailyPrices[0]?.dayMinPrice || 0);
    set({ dailyPrices, minimumPrice });
  },
  minimumPrice: 0,
  dailyPrices: [],

  maxPersonsNo: 10,
  personsNo: 0,
  changePersonsNo: (value) => {
    let person = 0;
    if (value) person = typeof value === 'string' ? parseInt(value) : value;
    if (person < 0) return;

    const personsNo = Math.min(person, get().maxPersonsNo);
    const { error, calculatePrice, bookingTime } = get();
    if (bookingTime && personsNo > bookingTime.maximumPersons) {
      set({
        bookingDate: undefined,
        bookingTime: undefined,
        bookingPrices: undefined,
        perPrice: 0,
      });
    }
    set({ personsNo, error: { ...error, [ErrorType.PersonsNo]: '' } });
    calculatePrice();
  },

  selectDateTime: (bookingDate, bookingTime, bookingPrices) => {
    const { error, calculatePrice } = get();

    set({
      bookingDate,
      bookingTime,
      bookingPrices,
      error: { ...error, [ErrorType.DateTime]: '' },
    });
    calculatePrice();
  },

  error: {},
  isValidated: () => {
    const { personsNo, bookingDate, bookingTime } = get();
    if (personsNo > 0 && bookingDate && bookingTime) return true;

    let error = {} as FormError;
    if (personsNo < 1)
      error[ErrorType.PersonsNo] = 'Please select number of persons';
    if (!(bookingDate && bookingTime))
      error[ErrorType.DateTime] = 'Please select start date';

    set({ error });

    return false;
  },
  book: () => {
    const isValidated = get().isValidated();
    if (!isValidated) return;
    alert('Booking made!');
  },

  perPrice: 0,
  totalPrice: 0,
  calculatePrice: () => {
    const { personsNo, bookingPrices } = get();
    if (!bookingPrices) {
      set({ totalPrice: 0, perPrice: 0 });
      return;
    }

    const sortedPrices = [...(bookingPrices || [])].sort(
      (p1, p2) => p2.min - p1.min
    );
    let price = sortedPrices[0];

    for (let i = 0; i < sortedPrices.length; i++) {
      const currPrice = sortedPrices[i];
      if (
        currPrice.max &&
        personsNo <= currPrice.max &&
        personsNo >= currPrice.min
      ) {
        price = currPrice;
      }
    }
    const totalPrice = price.price * personsNo;
    set({ totalPrice, perPrice: price.price });
  },
}));
