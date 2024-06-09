import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { ServicePageComponent } from './service-page/service-page.component';
import { ServiceComponent } from './service/service.component';
import { CreateServiceComponent } from './create-service/create-service.component';

const routes: Routes = [
  {
    path: '',
    component: ServicePageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'list',
        component: ServiceComponent,
        data: { name: 'home' },
      },
      {
        path: 'create',
        component: CreateServiceComponent,
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
export class ServicesRoutingModule { }
