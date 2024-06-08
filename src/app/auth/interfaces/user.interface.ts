import { Role } from "./role.interface";

export interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: Role;
}
