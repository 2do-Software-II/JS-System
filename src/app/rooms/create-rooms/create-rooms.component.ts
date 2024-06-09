import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoomService } from '../room.service';
import { RoomDto } from 'src/app/auth/interfaces/roomDto.interface';
import { ResourceService } from '../resource.service';
import { ServiceService } from 'src/app/services/services/service.service';
import { Service } from 'src/app/auth/interfaces/service.interface';
import { RoomServiceDto } from 'src/app/auth/interfaces/roomServiceDto.interface';

@Component({
  selector: 'app-create-rooms',
  templateUrl: './create-rooms.component.html',
})
export class CreateRoomsComponent implements OnInit {

  createForm: FormGroup;
  status: string[] = ['Disponible', 'Ocupado', 'Mantenimiento', 'En limpieza'];
  services!: Service[];
  servicesSelected = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private resourceService: ResourceService,
    private serviceService: ServiceService,
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
    this.serviceService.getServices().subscribe(
      (services) => {
        this.services = services;
        this.services.forEach((service) => {
          this.servicesSelected.addControl(service.id ?? "", this.formBuilder.control(false));
        });
      },
      (error) => {
        console.error('Error fetching services:', error);
        this.showSnackbar(error, 'Cerrar')
      }
    );
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
        const servicesSelected = this.getIdServicesSelected();
        console.log('servicesSelected:', servicesSelected);
        servicesSelected.forEach((serviceId) => {
          this.saveService({ room: room.id, service: serviceId });
        });
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

  saveService(roomServiceDto: RoomServiceDto) {
    this.serviceService.saveServiceInRoom(roomServiceDto).subscribe(
      (roomService) => {
        // console.log('RoomService created with ID:', roomService.id);
      },
      (error) => {
        // console.error('Error creating roomService:', error);
        this.showSnackbar(error, 'Cerrar')
      }
    );
  }

  getIdServicesSelected() {
    const servicesSelected = [];
    for (const key in this.servicesSelected.controls) {
      if (this.servicesSelected.get(key)?.value == true) {
        servicesSelected.push(key);
      }
    }
    return servicesSelected;
  }

  showSnackbar(message: string, action?: string) {
    this.snackbar.open(message, action, {
      duration: 2500,
    });
  }
}
