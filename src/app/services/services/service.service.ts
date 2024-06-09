import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Service } from 'src/app/auth/interfaces/service.interface';
import { ServiceDto } from 'src/app/auth/interfaces/serviceDto.interface';

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

}
