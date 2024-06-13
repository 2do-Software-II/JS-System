
export interface Dashboard {
  optionOne: {
    date: string;
    fullPayment: number
  }[];
  optionTwo: {
    monthNumber: number;
    fullPayment: number;
  }[];
  optionThree: {
    monthNumber: number;
    reservationCount: number;
  }[];
}
