import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { UsersComponent } from './pages/users/users.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';

const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'list',
        component: UsersComponent,
        data: { name: 'home' },
      },
      {
        path: 'create',
        component: CreateUserComponent,
        data: { name: 'home' },
      },
      {
        path: 'edit/:id',
        component: UpdateUserComponent,
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
export class UsersRoutingModule { }
