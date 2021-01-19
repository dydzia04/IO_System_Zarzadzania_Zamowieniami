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

  onEnter(): void {
    this.api.getCustomerByNipFromContractors(this.searchString).subscribe( data => {
      this.cart.customer.NIP = data.nip;
      this.cart.customer.address = data.departaments[0].street + ' '
        + data.departaments[0].city + ' '
        + data.departaments[0].postal_code + ' '
        + data.departaments[0].country;
      this.cart.customer.email = data.departaments[0].contacts[0].email;
      this.cart.customer.contact_surname = data.departaments[0].contacts[0].last_name;
      this.cart.customer.contact_name = data.departaments[0].contacts[0].name;
      this.cart.customer.phone = data.departaments[0].contacts[0].phone;
      this.cart.customer.name = data.name;
      console.log(data.nip);

      this.cart.cart.clear();

      this.matDialogRef.close();

      // console.log(data.departaments[0].contacts[0].email);
      // console.log(
      //   data.departaments[0].street + ' '
      //   + data.departaments[0].city + ' '
      //   + data.departaments[0].postal_code + ' '
      //   + data.departaments[0].country);
      // console.log(data);
    });
  }
}
