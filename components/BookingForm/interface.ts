export interface Price {
  min: number;
  max?: number;
  price: number;
}

export interface TimeSlot {
  maximumPersons: number;
  start: string;
  end: string;
}

export interface DailyPrice {
  dayMinPrice: number;
  prices: Price[];
  timeSlots: TimeSlot[];
}
