import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Service } from 'src/app/auth/interfaces/service.interface';
import { Room } from '../auth/interfaces/room.interface';
import { RoomDto } from '../auth/interfaces/roomDto.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {



  constructor(private readonly apollo: Apollo) { }

  getRooms(): Observable<Room[]> {
    return this.apollo.query({
      query: gql`
        query MyQuery {
          getAllRooms {
            id
            nroRoom
            status
            nroBeds
            nroPersons
            size
            price
            description
            type
            view
          }
        }
      `
    }).pipe(
      map((result: any) => result.data?.getAllRooms)
    );
  }

  getOneRoom(id: string): Observable<Room> {
    return this.apollo.query({
      query: gql`
        query GetOneRoom($id: String!) {
          getOneRoom(id: $id) {
            id
            nroRoom
            status
            nroBeds
            nroPersons
            size
            price
            description
            type
            view
          }
        }
      `,
      variables: {
        id
      }
    }).pipe(
      map((result: any) => result.data?.getOneRoom)
    );
  }

  createRoom(roomDto: RoomDto): Observable<Service> {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateRoom($room: CreateRoomDto!) {
          createRoom(createRoomDto: $room) {
            id
          }
        }
      `,
      variables: {
        room: roomDto
      }
    }).pipe(
      map((result: any) => result.data?.createRoom)
    );
  }

  updateRoom(id: string, roomDto: RoomDto): Observable<Room> {
    console.log('id', id);
    console.log('roomDto', roomDto);
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateRoom($id: String!, $room: UpdateRoomDto!) {
          updateRoom(id: $id, updateRoomDto: $room) {
            id
          }
        }
      `,
      variables: {
        id: id,
        room: roomDto
      }
    }).pipe(
      map((result: any) => result.data?.updateRoom)
    );
  }

}
