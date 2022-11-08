import { DailyPrice, Price, TimeSlot } from 'BookingForm/interface';
import { SAMPLE_PRICES, SAMPLE_TIME_SLOTS } from 'const';

const generateRandomNumber = (size: number) => Math.floor(Math.random() * size);

const generateTimeSlots = (): TimeSlot[] =>
  [0, 1, 2, 3].reduce((ret, index) => {
    const rand = generateRandomNumber(3);
    if (rand < 1) {
      const timeSlot = SAMPLE_TIME_SLOTS[index];
      if (timeSlot) ret.push(timeSlot);
    }
    return ret;
  }, [] as TimeSlot[]);

const generatePrices = (): Price[] =>
  [0, 1].reduce((ret, index) => {
    const price = generateRandomNumber(150) + 1;
    const priceSlot = { ...SAMPLE_PRICES[index], price };
    ret.push(priceSlot);
    return ret;
  }, [] as Price[]);

const getDailyMinPrice = (prices: Price[]) => {
  let min = Infinity;

  prices.forEach(({ price }) => {
    if (price < min) min = price;
  });

  return min;
};

export const generateDailyPrice = (): DailyPrice => {
  const timeSlots = generateTimeSlots();
  const prices = generatePrices();
  const dayMinPrice = getDailyMinPrice(prices);

  return {
    timeSlots,
    dayMinPrice,
    prices,
  };
};

export const generateMonthlyPrice = (): DailyPrice[] => {
  const november: DailyPrice[] = [];
  const december: DailyPrice[] = [];

  for (let i = 0; i < 31; i++) {
    if (i < 30) november.push(generateDailyPrice());
    december.push(generateDailyPrice());
  }

  return [...november, ...december];
};
