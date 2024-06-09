import { User } from "./user.interface";

export interface Customer {
  id?: string;
  name?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  ci?: string;
  expedition?: string;
  birthDate?: string;
  nationality?: string;
  gender?: string;
  preference?: string;
  user?: User;
}
