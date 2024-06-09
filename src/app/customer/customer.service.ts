import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Customer } from '../auth/interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private readonly apollo: Apollo) { }

  getCustomers(): Observable<Customer[]> {
    return this.apollo.query({
      query: gql`
        query MyQuery {
          getAllCustomers {
            id
            name
            lastName
            nationality
            phone
            preference
            gender
            expedition
            birthDate
            address
            ci
          }
        }
      `
    }).pipe(
      map((result: any) => result.data?.getAllCustomers)
    );
  }

  getOneCustomer(id: string): Observable<Customer> {
    return this.apollo.query({
      query: gql`
        query GetOneRoom($id: String!) {
          getOneCustomer(id: $id) {
            id
            name
            lastName
            nationality
            phone
            preference
            gender
            expedition
            birthdate
            address
            ci
        }
      `,
      variables: {
        id
      }
    }).pipe(
      map((result: any) => result.data?.getOneCustomer)
    );
  }
}
