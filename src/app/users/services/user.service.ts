import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/auth/interfaces';
import { Apollo, gql } from 'apollo-angular';
import { UserDTO } from 'src/app/auth/interfaces/userDto.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly apollo: Apollo) { }

  getUsers(): Observable<User[]> {
    return this.apollo.query({
      query: gql`
        query MyQuery {
          getAllUsers {
            id
            name
            email
            role{
              id
              name
            }
          }
        }
      `
    }).pipe(
      map((result: any) => result.data?.getAllUsers)
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
      mutation CreateUser($user: CreateUserDto!) {
        createUser(createUserDto: $user) {
          id
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


  deleteUser(id: string): Observable<boolean> {
    return this.apollo.mutate({
      mutation: gql`
        mutation MyMutation($id: String!) {
          deleteUser(id: $id)
        }
      `,
      variables: {
        id
      }
    }).pipe(
      map((result: any) => result.data?.deleteUser)
    );
  }

}
