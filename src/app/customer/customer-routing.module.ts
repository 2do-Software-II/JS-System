import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { CustomerComponent } from './customer/customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerPageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'list',
        component: CustomerComponent,
        data: { name: 'home' },
      },
      {
        path: 'create',
        component: CreateCustomerComponent,
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
export class CustomerRoutingModule { }
