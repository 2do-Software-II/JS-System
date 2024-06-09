import { Room } from "./room.interface";
import { Service } from "./service.interface";

export interface RoomService {
  service?: Service;
  room?: Room;
}
