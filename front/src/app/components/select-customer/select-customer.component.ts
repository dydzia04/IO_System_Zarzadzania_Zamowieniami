import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import ICustomer from '../../interface/ICustomer';
import {MatDialogRef} from '@angular/material/dialog';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.css']
})
export class SelectCustomerComponent implements OnInit {
  customers: ICustomer[];
  searchString: string;

  constructor(
    private api: ApiService,
    private cart: CartService,
    private matDialogRef: MatDialogRef<SelectCustomerComponent>,
  ) {
    this.searchString = '';
    this.customers = [];
    this.api.getCustomers().subscribe( data => {
      this.customers = data;
    });
  }

  ngOnInit(): void {
  }

  selectCustomer(customer: ICustomer): void {
    this.cart.customer = customer;
    this.matDialogRef.close();
  }
}
