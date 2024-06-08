import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { RolesComponent } from './roles/roles.component';
import { RolesPageComponent } from './roles-page/roles-page.component';
import { CreateRoleComponent } from './create-role/create-role.component';

const routes: Routes = [
  {
    path: '',
    component: RolesPageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'list',
        component: RolesComponent,
        data: { name: 'home' },
      },
      {
        path: 'create',
        component: CreateRoleComponent,
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
export class RolesRoutingModule { }
