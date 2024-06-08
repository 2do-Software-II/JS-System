import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
      path: 'login',
      component: LoginPageComponent ,
      canActivate: [AuthGuard],
      canMatch: [AuthGuard]
    },
    {
      path: 'register',
      component: RegisterPageComponent,
      canActivate: [AuthGuard],
      canMatch: [AuthGuard]
    },
    {
      path: '**',
      redirectTo: '404'
    }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
