import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { RoomsPageComponent } from './rooms-page/rooms-page.component';
import { RoomsComponent } from './rooms/rooms.component';
import { CreateRoomsComponent } from './create-rooms/create-rooms.component';
import { EditRoomsComponent } from './edit-rooms/edit-rooms.component';
import { ShowRoomsComponent } from './show-rooms/show-rooms.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsPageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'list',
        component: RoomsComponent,
        data: { name: 'home' },
      },
      {
        path: 'create',
        component: CreateRoomsComponent,
        data: { name: 'home' },
      },
      {
        path: 'edit/:id',
        component: EditRoomsComponent,
        data: { name: 'home' },
      },
      {
        path: 'show/:id',
        component: ShowRoomsComponent,
        data: { name: 'home' },
      },
      {
        path: '**',
        redirectTo: '404'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
