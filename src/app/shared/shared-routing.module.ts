import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: HomePageComponent,
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
export class SharedRoutingModule { }
