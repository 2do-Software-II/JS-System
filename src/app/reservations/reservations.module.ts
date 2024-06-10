import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { ShowReservationComponent } from './show-reservation/show-reservation.component';

import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ReservationPageComponent,
    ReservationComponent,
    CreateReservationComponent,
    EditReservationComponent,
    ShowReservationComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MaterialModule
  ]
})
export class ReservationsModule { }
