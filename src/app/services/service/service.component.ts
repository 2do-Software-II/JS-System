import { Component } from '@angular/core';
import { Service } from 'src/app/auth/interfaces/service.interface';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
})
export class ServiceComponent {
  public services: Service[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];

  constructor(
    private serviceService: ServiceService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.serviceService.getServices().subscribe((services) => {
      this.services = services;
    });
  }

  deleteUser(userId: string) {
    // this.roleService.deleteUser(userId).subscribe(() => {
    //   this.loadRoles(); // Actualizar la lista después de eliminar un usuario
    // });
  }

  updateUser(userId: string) {
    this.router.navigate(['services/edit', userId]);
  }
}
