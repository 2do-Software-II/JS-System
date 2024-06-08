import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from 'src/app/auth/interfaces';
import { environment } from 'src/environments/environment';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = environment.baseUrl + '/users';

  constructor(
    private http: HttpClient
  ) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  getUser(id: string): Observable<User | null> {
    return this.http.get<User>(`${this.baseUrl}/${id}`).
      pipe(
        catchError(err => of(null))
      );
  }

  createUser(data: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, data);
  }

  updateUser(userId: string,data: any): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${userId}`, data);
  }

  deleteUser(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`).
      pipe(
        map(() => true),
        catchError(err => of(false)),
      );
  }
}
