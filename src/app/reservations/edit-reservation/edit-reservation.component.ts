import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/auth/interfaces/customer.interface';
import { ReservationService } from '../reservation.service';
import { Room } from 'src/app/auth/interfaces/room.interface';
import { BookingDto } from 'src/app/auth/interfaces/bookingDto.interface';
import { PaymentMethod } from '../create-reservation/create-reservation.component';
import { tap } from 'rxjs';
import { Booking } from 'src/app/auth/interfaces/booking.interface';

export enum Status {
  PENDIENTE = 'PENDIENTE',
  RESERVADO = 'RESERVADO',
  CANCELADO = 'CANCELADO',
  CHECKIN = 'CHECKED_IN',
  FINALIZADO = 'FINALIZADO',
}

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {

  createForm: FormGroup;
  paymentMethods = [PaymentMethod.CASH, PaymentMethod.CARD, PaymentMethod.TRANSFER, PaymentMethod.DEPOSIT, PaymentMethod.ONLINE];
  statuses = [Status.PENDIENTE, Status.RESERVADO, Status.CANCELADO, Status.CHECKIN, Status.FINALIZADO];
  customer!: Customer;
  room!: Room;
  booking!: Booking;
  customerName!: string;
  roomName!: string;

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: ReservationService,
    private router: Router,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) {
    this.createForm = this.formBuilder.group({
      checkIn: [''],
      checkOut: [''],
      paymentMethod: ['', Validators.required],
      startDate: ['', Validators.required],
      fullPayment: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(tap(({ id }) => { this.getReservationById(id); })).subscribe();
  }


  getReservationById(id: string) {
    this.bookingService.getOneBooking(id).subscribe(
      (booking) => {
        this.createForm.patchValue({
          paymentMethod: booking.paymentMethod,
          startDate: this.changeFormatDate(booking.startDate),
          endDate: this.changeFormatDate(booking.endDate),
          fullPayment: booking.fullPayment,
          status: booking.status,
        });
        if (booking.checkIn != "") this.createForm.patchValue({ checkIn: this.changeFormatDate(booking.checkIn) });
        if (booking.checkOut != "") this.createForm.patchValue({ checkOut: this.changeFormatDate(booking.checkOut) });
        this.booking = booking;
        this.customerName = booking.customer.name + ' ' + booking.customer.lastName;
        this.roomName = booking.room.nroRoom + ' | Costo: ' + booking.room.price + ' Bs';
        console.log('booking:', booking);
      },
      (error) => {
        console.error('Error getting booking:', error);
        this.showSnackbar(error, 'Cerrar')
      }
    );
  }

  onSubmit() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }
    const { startDate, endDate, checkIn, checkOut, ...rest } = this.createForm.value;
    const startDateF = this.extractDateFormat(startDate);
    const endDateF = this.extractDateFormat(endDate);
    const checkInF = this.extractDateFormat(checkIn);
    const checkOutF = this.extractDateFormat(checkOut);
    this.register(
      {
        startDate: startDateF, endDate: endDateF,
        checkIn: checkInF, checkOut: checkOutF,
        ...rest
      }
    );
  }

  register(booking: BookingDto) {
    console.log('booking:', booking);
    this.bookingService.updateBooking(this.booking.id, booking).subscribe(
      (booking) => {
        console.log('booking created with ID:', booking.id);
        this.showSnackbar('Registrado correctamente', 'Entendido!');
        this.router.navigate(['reservations/list']);
      },
      (error) => {
        console.error('Error creating user:', error);
        this.showSnackbar(error, 'Cerrar')
      }
    );
  }

  calculateFullPayment() {
    const roomPrice = this.booking?.room?.price ?? 0;
    const totalDays = this.calculateTotalDays(this.createForm.value.startDate, this.createForm.value.endDate);
    this.createForm.patchValue({ fullPayment: totalDays * roomPrice });
  }

  extractDateFormat(date: string) {
    const dateI = new Date(date);
    const day = dateI.getDate();
    const month = dateI.getMonth() + 1;
    const year = dateI.getFullYear();
    return `${day}/${month}/${year}`;
  }

  calculateTotalDays(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (!start || !end) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    if (diffTime < 0) return 0;
    if (diffTime === 0) return 1;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) ?? 0;
  }

  changeFormatDate(date: string) {
    const dateI = date.split('/');
    const day = dateI[0];
    const month = dateI[1];
    const year = dateI[2];
    return new Date(`${month}/${day}/${year}`);
  }

  showSnackbar(message: string, action?: string) {
    this.snackbar.open(message, action, {
      duration: 2500,
    });
  }
}
