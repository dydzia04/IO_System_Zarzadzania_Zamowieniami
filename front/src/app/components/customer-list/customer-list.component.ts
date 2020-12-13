import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import ICustomer from '../../interface/ICustomer';
import { FormControl } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
    faCheckCircle = faCheckCircle;

    customerList$: Subscription;
    customerList: Array<ICustomer>;
    searchString: FormControl;

    constructor(
        private api: ApiService,
        private filter: FilterService,
    ) {
        this.customerList$ = new Subscription();
        this.customerList = [];
        this.searchString = new FormControl('');
    }

    ngOnInit(): void {
        this.api.setFilterableListOfCustomers();
        this.customerList$ = this.filter.listOfCustomers.subscribe((data: Array<ICustomer>) => {
            this.customerList = data;
        });
    }

    ngOnDestroy(): void {
        this.customerList$.unsubscribe();
    }

}
