import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/auth/interfaces/customer.interface';
import { RoomService } from 'src/app/rooms/room.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { ReservationService } from '../reservation.service';
import { Room } from 'src/app/auth/interfaces/room.interface';
import { BookingDto } from 'src/app/auth/interfaces/bookingDto.interface';

export enum PaymentMethod {
  CASH = 'EFECTIVO',
  CARD = 'TARJETA',
  TRANSFER = 'TRANSFERENCIA',
  DEPOSIT = 'DEPOSITO',
  ONLINE = 'ONLINE',
}

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
})
export class CreateReservationComponent implements OnInit {

  createForm: FormGroup;
  paymentMethods = [PaymentMethod.CASH, PaymentMethod.CARD, PaymentMethod.TRANSFER, PaymentMethod.DEPOSIT, PaymentMethod.ONLINE];
  customers: Customer[] = [];
  rooms: Room[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private roomService: RoomService,
    private bookingService: ReservationService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {
    this.createForm = this.formBuilder.group({
      checkIn: ['',],
      checkOut: ['',],
      paymentMethod: ['', Validators.required],
      startDate: ['', Validators.required],
      fullPayment: ['', Validators.required],
      endDate: ['', Validators.required],
      customer: ['', Validators.required],
      room: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
    this.roomService.getAllRoomsByAvailable().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  onSubmit() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }
    const now = new Date();
    const date = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
    const time = now.getHours() + ':' + now.getMinutes();
    const { startDate, endDate, checkIn, checkOut, ...rest } = this.createForm.value;
    const startDateF = this.extractDateFormat(startDate);
    const endDateF = this.extractDateFormat(endDate);
    const checkInF = this.extractDateFormat(checkIn);
    const checkOutF = this.extractDateFormat(checkOut);
    this.register(
      { date, time,
        startDate: startDateF, endDate: endDateF,
        checkIn: checkInF, checkOut: checkOutF,
         ...rest }
    );
  }

  register(booking: BookingDto) {
    console.log('booking:', booking);
    this.bookingService.createBooking(booking).subscribe(
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
    const roomSelected = this.rooms.find((room) => room.id === this.createForm.value.room);
    const roomPrice = roomSelected?.price ?? 0;
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

  showSnackbar(message: string, action?: string) {
    this.snackbar.open(message, action, {
      duration: 2500,
    });
  }
}
