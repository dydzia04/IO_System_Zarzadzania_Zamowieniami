import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import ICustomer from '../../interface/ICustomer';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faPlusCircle = faPlusCircle;

  private customer$: Subscription;
  customer: ICustomer;
  faInfoCircle = faInfoCircle;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) {
    this.customer = {
      orders: [],
      NIP: '',
      address: '',
      contact_name: '',
      contact_surname: '',
      created_at: '',
      email: '',
      id: 0,
      name: '',
      phone: '',
      updated_at: ''
    };
    this.customer$ = this.api.getCustomerByNIP(route.snapshot.params.nip).subscribe( data => {
      this.customer = data;
    });
  }

  ngOnInit(): void {
  }

}
