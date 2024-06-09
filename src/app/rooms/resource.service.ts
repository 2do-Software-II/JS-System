import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Resource } from '../auth/interfaces/resource.interface';
import { ResourceDto } from '../auth/interfaces/resourceDto.interface';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private readonly apollo: Apollo) { }

  getResourceById(roomId: string): Observable<Resource[]> {
    return this.apollo.query({
      query: gql`
        query MyQuery($id: String!) {
          getAllResourcesByRoom(String $id) {
            id
            url
          }
        }
      `,
      variables: {
        id: roomId
      }
    }).pipe(
      map((result: any) => result.data?.getAllResourcesByRoom)
    );
  }

  createResource(resourceDto: ResourceDto): Observable<Resource> {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddResource($resource: CreateResourceDto!) {
          addResource(createResourceDto: $resource) {
            id
          }
        }
      `,
      variables: {
        resource: resourceDto
      }
    }).pipe(
      map((result: any) => result.data?.addResource)
    );
  }

}
