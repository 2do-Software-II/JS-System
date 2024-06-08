import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/auth/interfaces';
import { RoleService } from 'src/app/users/services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
})
export class RolesComponent implements OnInit {
  public roles: Role[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];

  constructor(
    private roleService: RoleService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  deleteUser(userId: string) {
    // this.roleService.deleteUser(userId).subscribe(() => {
    //   this.loadRoles(); // Actualizar la lista después de eliminar un usuario
    // });
  }

  updateUser(userId: string) {
    this.router.navigate(['roles/edit', userId]);
  }
}
