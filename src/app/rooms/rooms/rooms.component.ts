import { Component, ViewChild } from '@angular/core';
import { Room } from 'src/app/auth/interfaces/room.interface';
import { RoomService } from '../room.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
})
export class RoomsComponent {

  public rooms: Room[] = [];
  displayedColumns: string[] = ['nroRoom', 'status', 'description', 'capacity', 'price', 'type', 'size', 'actions'];
  dataSource!: MatTableDataSource<Room>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private roomService: RoomService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
      this.dataSource = new MatTableDataSource(rooms);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(id: string) {
  }

  update(id: string) {
    this.router.navigate(['rooms/edit', id]);
  }
}
