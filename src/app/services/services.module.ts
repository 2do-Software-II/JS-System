import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicePageComponent } from './service-page/service-page.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { ServicesRoutingModule } from './services-routing.module';

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
import { ServiceComponent } from './service/service.component';


@NgModule({
  declarations: [
    ServicePageComponent,
    CreateServiceComponent,
    ServiceComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
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
export class ServicesModule { }
