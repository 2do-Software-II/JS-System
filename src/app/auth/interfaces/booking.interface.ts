import { Customer } from "./customer.interface";
import { Room } from "./room.interface";

export interface Booking {
  id: string;
  date: string;
  time: string;
  status: string;
  checkIn: string;
  checkOut: string;
  prePaid: number;
  fullPayment: number;
  paymentMethod: string;
  startDate: string;
  endDate: string;
  customer: Customer;
  room: Room;
}
