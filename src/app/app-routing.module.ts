import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "home",
    loadChildren: () => import("./shared/shared.module").then(m => m.SharedModule)
  },
  {
    path: "users",
    loadChildren: () => import("./users/users.module").then(m => m.UsersModule),
  },
  {
    path: "roles",
    loadChildren: () => import("./roles/roles.module").then(m => m.RolesModule),
    data: { name: 'roles' }
  },
  {
    path: "services",
    loadChildren: () => import("./services/services.module").then(m => m.ServicesModule),
    data: { name: 'services' }
  },
  {
    path: "rooms",
    loadChildren: () => import("./rooms/rooms.module").then(m => m.RoomsModule),
    data: { name: 'rooms' }
  },
  {
    path: "customers",
    loadChildren: () => import("./customer/customer.module").then(m => m.CustomerModule),
    data: { name: 'customers' }
  },
  {
    path: "reservations",
    loadChildren: () => import("./reservations/reservations.module").then(m => m.ReservationsModule),
    data: { name: 'reservations' }
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
