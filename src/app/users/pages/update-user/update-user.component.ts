import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from 'src/app/auth/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  editForm: FormGroup;
  userId!: string;
  roles: string[] = ['administrador', 'guardia', 'funcionario'];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {
    this.editForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      // Otros campos del formulario
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.userId = id;
      this.loadUser(this.userId);
    } else {
      // Manejar el caso en el que el ID es nulo, por ejemplo, redirigiendo a una página de error o mostrando un mensaje al usuario.
      console.log('error');
    }

    }

  loadUser(userId: string): void {
    this.userService.getUser(userId).subscribe(user => {
      if (user !== null && user !== undefined) {
        this.editForm.patchValue({
          name: user.name,
          email: user.email,
          role: user.role,
          // Otros campos del formulario con sus valores correspondientes
        });
      } else {
        // Manejar el caso en el que el usuario no existe, por ejemplo, redirigiendo a una página de error o mostrando un mensaje al usuario.
      }
    });
  }

  saveUser(): void {
    // Obtén los valores del formulario y actualiza el usuario con el ID proporcionado
    const userData = this.editForm.value;
    this.userService.updateUser(this.userId, userData).subscribe(response => {
        this.router.navigate(['/users']);
        console.log('Usuario editado correctamente');
        // Realiza cualquier otra acción necesaria después de editar el usuario
      },
      error => {
        console.error('Error al editar el usuario', error);
        // Maneja el error de alguna manera apropiada para tu aplicación
      }
    );
  }
}
