import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsPageComponent } from './rooms-page/rooms-page.component';
import { RoomsComponent } from './rooms/rooms.component';
import { CreateRoomsComponent } from './create-rooms/create-rooms.component';
import { EditRoomsComponent } from './edit-rooms/edit-rooms.component';
import { ShowRoomsComponent } from './show-rooms/show-rooms.component';

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
import { SharedModule } from '../shared/shared.module';
import { RoomsRoutingModule } from './rooms-routing.module';

@NgModule({
  declarations: [
    RoomsPageComponent,
    RoomsComponent,
    CreateRoomsComponent,
    EditRoomsComponent,
    ShowRoomsComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
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
export class RoomsModule { }
