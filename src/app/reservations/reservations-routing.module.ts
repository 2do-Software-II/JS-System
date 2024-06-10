import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { ReservationComponent } from './reservation/reservation.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { ShowReservationComponent } from './show-reservation/show-reservation.component';

const routes: Routes = [{
  path: '',
  component: ReservationPageComponent,
  canActivate: [AuthenticationGuard],
  children: [
    {
      path: 'list',
      component: ReservationComponent,
      data: { name: 'home' },
    },
    {
      path: 'create',
      component: CreateReservationComponent,
      data: { name: 'home' },
    },
    {
      path: 'edit/:id',
      component: EditReservationComponent,
      data: { name: 'home' },
    },
    {
      path: 'show/:id',
      component: ShowReservationComponent,
      data: { name: 'home' },
    },
    {
      path: '**',
      redirectTo: '404'
    }
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
