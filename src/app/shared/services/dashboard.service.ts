import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Dashboard } from 'src/app/auth/interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private readonly apollo: Apollo) { }

  get(): Observable<Dashboard> {
    return this.apollo.query({
      query: gql`
        query MyQuery {
          getDashboard {
            optionOne {
              date
              fullPayment
            }
            optionThree {
              monthNumber
              reservationCount
            }
            optionTwo {
              fullPayment
              monthNumber
            }
          }
        }
      `
    }).pipe(
      map((result: any) => result.data?.getDashboard)
    );
  }

}
