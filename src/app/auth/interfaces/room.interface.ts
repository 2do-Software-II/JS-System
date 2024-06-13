import { Customer } from "./customer.interface";

export interface Room {
  id?: string;
  nroRoom?: string;
  status?: string;
  nroBeds: number;
  nroPersons: number;
  size?: string;
  price?: number;
  description?: string;
  type?: string;
  view?: string;
}
