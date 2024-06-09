import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role, User } from 'src/app/auth/interfaces';
import { Apollo, gql } from 'apollo-angular';
import { UserDTO } from 'src/app/auth/interfaces/userDto.interface';
import { RoleDto } from 'src/app/auth/interfaces/roleDto.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private readonly apollo: Apollo) { }

  getRoles(): Observable<Role[]> {
    return this.apollo.query({
      query: gql`
        query MyQuery {
          getAllRoles {
            id
            name
            description
          }
        }
      `
    }).pipe(
      map((result: any) => result.data?.getAllRoles)
    );
  }

  createRole(roleDto: RoleDto): Observable<Role> {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateRole($role: CreateRoleDto!) {
          createRole(createRoleDto: $role) {
            id
          }
        }
      `,
      variables: {
        role: roleDto
      }
    }).pipe(
      map((result: any) => result.data?.createRole)
    );
  }

}
