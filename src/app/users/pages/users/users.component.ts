import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/auth/interfaces';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers(); // Actualizar la lista después de eliminar un usuario
    });
  }

  updateUser(userId: string) {
    this.router.navigate(['users/edit', userId]);
  }

}
