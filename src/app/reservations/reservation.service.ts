import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Booking } from '../auth/interfaces/booking.interface';
import { BookingDto } from '../auth/interfaces/bookingDto.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private readonly apollo: Apollo) { }

  getReservations(): Observable<Booking[]> {
    return this.apollo.query({
      query: gql`
        query MyQuery {
          getAllBookings {
            id
            date
            time
            status
            checkIn
            checkOut
            prePaid
            fullPayment
            paymentMethod
            startDate
            endDate
            customer {
              id
              name
              lastName
              phone
            }
            room {
              id
              nroRoom
              status
              price
            }
          }
        }
      `
    }).pipe(
      map((result: any) => result.data?.getAllBookings)
    );
  }

  getOneBooking(id: string): Observable<Booking> {
    return this.apollo.query({
      query: gql`
        query GetOneBooking($id: String!) {
          getOneBooking(id: $id) {
            id
            date
            time
            status
            checkIn
            checkOut
            prePaid
            fullPayment
            paymentMethod
            startDate
            endDate
            customer {
              id
              name
              lastName
              phone
            }
            room {
              id
              nroRoom
              status
              price
            }
          }
        }
      `,
      variables: {
        id
      }
    }).pipe(
      map((result: any) => result.data?.getOneBooking)
    );
  }

  getAllBookingsByStatus(status: string): Observable<Booking[]> {
    return this.apollo.query({
      query: gql`
        query GetAllBookingsBy($status: String!) {
          getAllBookingsBy(attr: status, value: $status) {
            id
            date
            time
            status
            checkIn
            checkOut
            prePaid
            fullPayment
            paymentMethod
            startDate
            endDate
            customer {
              id
              name
              lastName
              phone
            }
            room {
              id
              nroRoom
              status
              price
            }
          }
        }
      `,
      variables: {
        status
      }
    }).pipe(
      map((result: any) => result.data?.getAllBookingsBy)
    );
  }



  createBooking(bookingDto: BookingDto): Observable<Booking> {
    bookingDto.status = 'Pendiente';
    if (bookingDto.checkIn == "NaN/NaN/NaN") bookingDto.checkIn = "";
    if (bookingDto.checkOut == "NaN/NaN/NaN") bookingDto.checkOut = "";
    console.log('bookingDto:', bookingDto);
    return this.apollo.mutate({
      mutation: gql`
        mutation createBooking($bookingDto: CreateBookingDto!) {
          createBooking(createBookingDto: $bookingDto) {
            id
          }
        }
      `,
      variables: {
        bookingDto: bookingDto
      }
    }).pipe(
      map((result: any) => result.data?.createBooking)
    );
  }

  updateBooking(id: string, bookingDto: BookingDto): Observable<Booking> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateBooking($id: String!, $bookingDto: UpdateBookingDto!) {
          updateBooking(id: $id, updateBookingDto: $bookingDto) {
            id
          }
        }
      `,
      variables: {
        id: id,
        bookingDto: bookingDto
      }
    }).pipe(
      map((result: any) => result.data?.updateBooking)
    );
  }


  deleteBooking(id: string): Observable<Booking> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteBooking($id: String!) {
          deleteBooking(id: $id) {
            id
          }
        }
      `,
      variables: {
        id
      }
    }).pipe(
      map((result: any) => result.data?.deleteBooking)
    );
  }

}
