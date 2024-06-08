import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role, User } from 'src/app/auth/interfaces';
import { Apollo, gql } from 'apollo-angular';
import { UserDTO } from 'src/app/auth/interfaces/userDto.interface';

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

  getUserById(id: string): Observable<User> {
    return this.apollo.query({
      query: gql`
        query MyQuery($id: String!) {
          getOneUser(id: $id) {
            id
            name
            email
            role{
              id
              name
            }
          }
        }
      `,
      variables: {
        id
      }
    }).pipe(
      map((result: any) => result.data?.getUserById)
    );
  }

  createUser(userDto: UserDTO): Observable<User> {
    return this.apollo.mutate({
      mutation: gql`
        mutation MyMutation() {
          createUser(createUserDto: $user) {
            id
            name
            email
            role{
              id
              name
            }
          }
        }
      `,
      variables: {
        user: userDto
      }
    }).pipe(
      map((result: any) => result.data?.createUser)
    );
  }

  updateUser(user: User): Observable<User> {
    return this.apollo.mutate({
      mutation: gql`
        mutation MyMutation($user: UserInput!) {
          updateUser(user: $user) {
            id
            name
            email
            role{
              id
              name
            }
          }
        }
      `,
      variables: {
        user
      }
    }).pipe(
      map((result: any) => result.data?.updateUser)
    );
  }

}
