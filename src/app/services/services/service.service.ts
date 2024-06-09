import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Service } from 'src/app/auth/interfaces/service.interface';
import { ServiceDto } from 'src/app/auth/interfaces/serviceDto.interface';
import { RoomServiceDto } from 'src/app/auth/interfaces/roomServiceDto.interface';
import { RoomService } from 'src/app/auth/interfaces/roomService.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private readonly apollo: Apollo) { }

  getServices(): Observable<Service[]> {
    return this.apollo.query({
      query: gql`
        query MyQuery {
          getAllServices {
            id
            name
            description
          }
        }
      `
    }).pipe(
      map((result: any) => result.data?.getAllServices)
    );
  }

  createService(serviceDto: ServiceDto): Observable<Service> {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateService($service: CreateServiceDto!) {
          createService(createServiceDto: $service) {
            id
          }
        }
      `,
      variables: {
        service: serviceDto
      }
    }).pipe(
      map((result: any) => result.data?.createService)
    );
  }

  saveServiceInRoom(roomServiceDto: RoomServiceDto): Observable<RoomService> {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddServices($roomService: CreateRoomServiceDto!) {
          addServices(createRoomServiceDto: $roomService) {
            id
          }
        }
      `,
      variables: {
        roomService: roomServiceDto
      }
    }).pipe(
      map((result: any) => result.data?.addServices)
    );
  }

  getServicesByRoom(roomId: string): Observable<RoomService[]> {
    return this.apollo.query({
      query: gql`
        query GetServicesByRoom($roomId: String!) {
          getServicesByRoom(id: $roomId) {
            id
            service {
              id
              name
              description
            }
          }
        }
      `,
      variables: {
        roomId
      }
    }).pipe(
      map((result: any) => result.data?.getServicesByRoom)
    );
  }

}
