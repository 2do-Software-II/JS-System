import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Register } from '../../interfaces/register.interface';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'auth-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  public registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
  ) { }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { nombre, apellido, email, password } = this.registerForm.value;
    this.register({ nombre, apellido, email, password, role: 'admin'});
  }


  register(user: Register) {
    console.log(user);
    this.authService.register(user)
      .pipe(
        tap(resp => console.log(resp)),
        catchError(err => of(
          this.showSnackbar(err.error.message, 'Cerrar')
        ))
      ).subscribe(resp => {
        this.router.navigate(['auth/login']);
        this.showSnackbar('Registrado correctamente', 'Entendido!');
      });
  }

  isValidField(field: string): boolean | null {
    return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.registerForm.controls[field]) return null;
    const errors = this.registerForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo es obligatorio';
        case 'minlength':
          return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`
      }
    }
    return null;
  }

  showSnackbar(message: string, action?: string) {
    this.snackbar.open(message, action, {
      duration: 2500,
    });
  }
}
function subscribe(arg0: (resp: any) => void) {
  throw new Error('Function not implemented.');
}

