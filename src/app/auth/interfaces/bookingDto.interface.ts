import { Customer } from "./customer.interface";
import { Room } from "./room.interface";

export interface BookingDto {
  date: string;
  time: string;
  status: string;
  checkIn: string | null;
  checkOut: string | null;
  prePaid: number;
  fullPayment: number;
  paymentMethod: string;
  startDate: string;
  endDate: string;
  customer: string;
  room: string;
}
