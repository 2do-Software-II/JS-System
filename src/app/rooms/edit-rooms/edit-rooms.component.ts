import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../room.service';
import { RoomDto } from 'src/app/auth/interfaces/roomDto.interface';
import { ResourceService } from '../resource.service';
import { tap } from 'rxjs';
import { Room } from 'src/app/auth/interfaces/room.interface';

@Component({
  selector: 'app-edit-rooms',
  templateUrl: './edit-rooms.component.html',
})
export class EditRoomsComponent implements OnInit {

  createForm: FormGroup;
  status: string[] = ['Disponible', 'Ocupado', 'Mantenimiento', 'En limpieza'];
  room!: Room;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private resourceService: ResourceService,
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
      },
      (error) => {
        console.error('Error getting room:', error);
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


  showSnackbar(message: string, action?: string) {
    this.snackbar.open(message, action, {
      duration: 2500,
    });
  }
}
