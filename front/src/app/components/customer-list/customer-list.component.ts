import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import ICustomer from '../../interface/ICustomer';
import {Subscription} from 'rxjs';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  faInfoCircle = faInfoCircle;

  customerList$: Subscription;
  customerList: Array<ICustomer>;
  inputNip: string;
  isNipValid: boolean;

  constructor(
    private api: ApiService,
  ) {
    this.customerList = [];
    this.customerList$ = this.api.getCustomers().subscribe( customers => {
      this.customerList = customers;
    });
    this.inputNip = '';
    this.isNipValid = false;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.customerList$.unsubscribe();
  }

  isNIPValid(): void {
    let nipToCheck = this.inputNip.replace('-', '');
    nipToCheck = nipToCheck.replace(' ', '');

    this.isNipValid = nipToCheck.length === 10;
  }
}
