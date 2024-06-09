import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { UserDTO } from 'src/app/auth/interfaces/userDto.interface';
import { RoleService } from '../../services/role.service';
import { Role } from 'src/app/auth/interfaces';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent implements OnInit {

  createForm: FormGroup;
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  onSubmit() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const { name, email, password, role } = this.createForm.value;
    this.register({ name, email, password, role });
  }

  register(user: UserDTO) {
    this.userService.createUser(user).subscribe(
      (user) => {
        console.log('User created with ID:', user.id);
        this.showSnackbar('Registrado correctamente', 'Entendido!');
        this.router.navigate(['users/list']);
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
