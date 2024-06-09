import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoleDto } from 'src/app/auth/interfaces/roleDto.interface';
import { RoleService } from 'src/app/users/services/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
})
export class CreateRoleComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const { name, description } = this.createForm.value;
    this.register({ name, description });
  }

  register(role: RoleDto) {
    this.roleService.createRole(role).subscribe(
      (role) => {
        console.log('User created with ID:', role.id);
        this.showSnackbar('Registrado correctamente', 'Entendido!');
        this.router.navigate(['roles/list']);
      },
      (error) => {
        console.error('Error creating user:', error);
        this.showSnackbar(error, 'Cerrar')
      }
    );
  }

  showSnackbar(message: string, action?: string) {
    this.snackbar.open(message, action, {
      duration: 2500,
    });
  }
}
