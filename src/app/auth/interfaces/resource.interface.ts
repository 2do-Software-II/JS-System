import { Room } from "./room.interface";

export interface Resource {
  id?: string;
  url?: string;
  room?: Room;
}
