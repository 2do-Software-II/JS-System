import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoomService } from '../room.service';
import { RoomDto } from 'src/app/auth/interfaces/roomDto.interface';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-create-rooms',
  templateUrl: './create-rooms.component.html',
})
export class CreateRoomsComponent implements OnInit {

  createForm: FormGroup;
  status: string[] = ['Disponible', 'Ocupado', 'Mantenimiento', 'En limpieza'];

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private resourceService: ResourceService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {
    this.createForm = this.formBuilder.group({
      nroRoom: ['', Validators.required],
      status: ['', Validators.required],
      nroBeds: ['', Validators.required],
      nroPersons: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      view: ['', Validators.required],
      urlOne: ['', Validators.required],
      urlTwo: ['', Validators.required],
      urlThree: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }
    const { urlOne, urlTwo, urlThree, ...rest } = this.createForm.value;
    this.saveRoom(urlOne, urlTwo, urlThree, rest);
  }

  saveRoom(urlOne: string, urlTwo: string, urlThree: string, room: RoomDto) {
    this.roomService.createRoom(room).subscribe(
      (room) => {
        this.saveImages(urlOne, room.id);
        this.saveImages(urlTwo, room.id);
        this.saveImages(urlThree, room.id);
        this.showSnackbar('Registrado correctamente', 'Entendido!');
        this.router.navigate(['rooms/list']);
      },
      (error) => {
        console.error('Error creating room:', error);
        this.showSnackbar(error, 'Cerrar')
      }
    );
  }

  saveImages(url: string, roomId: any) {
    this.resourceService.createResource({ url, room: roomId }).subscribe(
      (resource) => {
        console.log('Resource created with ID:', resource.id);
      },
      (error) => {
        console.error('Error creating resource:', error);
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
