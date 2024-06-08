import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AsideComponent } from './components/aside/aside.component';
import { NavComponent } from './components/nav/nav.component';
import { MaterialModule } from '../material/material.module';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    LayoutPageComponent,
    AsideComponent,
    NavComponent,
    Error404PageComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    AuthModule,
  ],
  exports: [
    LayoutPageComponent,
    AsideComponent,
    NavComponent,
  ]
})
export class SharedModule { }
