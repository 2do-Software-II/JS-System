import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomDto } from 'src/app/auth/interfaces/roomDto.interface';
import { ResourceService } from '../resource.service';
import { tap } from 'rxjs';
import { Room } from 'src/app/auth/interfaces/room.interface';
import { Service } from 'src/app/auth/interfaces/service.interface';
import { ServiceService } from 'src/app/services/services/service.service';
import { RoomServiceDto } from 'src/app/auth/interfaces/roomServiceDto.interface';
import { RoomService as RoomServiceI } from 'src/app/auth/interfaces/roomService.interface';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-edit-rooms',
  templateUrl: './edit-rooms.component.html',
})
export class EditRoomsComponent implements OnInit {

  createForm: FormGroup;
  status: string[] = ['Disponible', 'Ocupado', 'Mantenimiento', 'En limpieza'];
  room!: Room;

  services!: Service[];
  servicesSaved!: RoomServiceI[];
  servicesSelected = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private resourceService: ResourceService,
    private serviceService: ServiceService,
    private router: Router,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
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
      urlOne: [''],
      urlTwo: [''],
      urlThree: [''],
    });
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(tap(({ id }) => { this.getRoomById(id); })).subscribe();
  }

  getRoomById(id: string) {
    this.roomService.getOneRoom(id).subscribe(
      (room) => {
        this.room = room;
        this.createForm.patchValue(room);
        this.loadServices();
      },
      (error) => {
        console.error('Error getting room:', error);
        this.showSnackbar(error, 'Cerrar')
      }
    );
  }

  loadServices() {
    this.serviceService.getServices().subscribe(
      (services) => {
        this.services = services;
        this.services.forEach((service) => {
          this.servicesSelected.addControl(service.id ?? "", this.formBuilder.control(false));
        });
        this.getServiceByRoomId(this.room.id ?? "");
      },
      (error) => {
        console.error('Error fetching services:', error);
        this.showSnackbar(error, 'Cerrar')
      }
    );
  }

  getServiceByRoomId(id: string) {
    this.serviceService.getServicesByRoom(id).subscribe(
      (services) => {
        this.servicesSaved = services;
        services.forEach((service) => {
          this.servicesSelected.get(service?.service?.id ?? "")?.setValue(true);
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

  saveRoom(urlOne: string, urlTwo: string, urlThree: string, roomDto: RoomDto) {
    this.roomService.updateRoom(this.room?.id || '', roomDto).subscribe(
      (room) => {
        this.saveImages(urlOne, room.id);
        this.saveImages(urlTwo, room.id);
        this.saveImages(urlThree, room.id);
        const servicesSelected = this.getIdServicesSelected();
        console.log('servicesSelected:', servicesSelected);
        servicesSelected.forEach((serviceId) => {
          let exists = false;
          this.servicesSaved.forEach((service) => {
            if (service?.service?.id === serviceId) {
              exists = true;
            }
          });
          if (!exists) this.saveService({ room: room.id, service: serviceId });
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
    if (!url) return;
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
