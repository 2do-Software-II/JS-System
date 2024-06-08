import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'shared-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  public user!: User;

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['auth/login']);
  }

}
