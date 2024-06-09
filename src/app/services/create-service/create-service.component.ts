import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { ServiceDto } from 'src/app/auth/interfaces/serviceDto.interface';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
})
export class CreateServiceComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
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

  register(service: ServiceDto) {
    this.serviceService.createService(service).subscribe(
      (service) => {
        console.log('User created with ID:', service.id);
        this.showSnackbar('Registrado correctamente', 'Entendido!');
        this.router.navigate(['services/list']);
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
