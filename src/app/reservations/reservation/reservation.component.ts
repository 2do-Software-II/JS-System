import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Booking } from 'src/app/auth/interfaces/booking.interface';
import { ReservationService } from '../reservation.service';

// enum the status
enum Status {
  ALL = 'ALL',
  PENDING = 'PENDIENTE',
  RESERVATED = 'RESERVADO',
  CANCELED = 'CANCELADO',
  CHECKED_IN = 'CHECKED_IN',
  FINISHED = 'FINALIZADO',
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
})
export class ReservationComponent implements OnInit {
  public reservations: Booking[] = [];
  public fillterStatus: Status = Status.ALL;
  public statuses = [Status.ALL, Status.PENDING, Status.RESERVATED, Status.CANCELED, Status.CHECKED_IN, Status.FINISHED];

  displayedColumns: string[] = ['name', 'phone', 'nroRoom', 'date', 'status', 'checkIn', 'checkOut', 'fullPayment', 'actions'];
  dataSource!: MatTableDataSource<Booking>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private reservationService: ReservationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    if (this.fillterStatus === Status.ALL) {
      this.reservationService.getReservations().subscribe((reservations) => {
        this.reservations = reservations;
        this.dataSource = new MatTableDataSource(reservations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else {
      this.reservationService.getReservations().subscribe((reservations) => {
        this.reservations = reservations;
        this.dataSource = new MatTableDataSource(reservations.filter((reservation) => reservation.status === this.fillterStatus));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  fillterByStatus(status: Status) {
    this.fillterStatus = status;
    this.loadRooms();
  }


  delete(id: string) {
    this.reservationService.deleteBooking(id).subscribe(() => {
      this.loadRooms();
    });
  }

  update(id: string) {
    this.router.navigate(['reservations/edit', id]);
  }
}
