import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/auth/interfaces/customer.interface';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {

  public customers: Customer[] = [];
  displayedColumns: string[] = ['name', 'phone', 'address', 'ci', 'nationality', 'gender', 'actions'];
  dataSource!: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
      this.dataSource = new MatTableDataSource(customers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(id: string) {
  }

  update(id: string) {
    this.router.navigate(['customers/edit', id]);
  }
}
