import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import IGetOrder from '../../interface/IGetOrder';
import { FormControl } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { Subscription } from 'rxjs';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  faTrashAlt = faTrashAlt;
  faInfoCircle = faInfoCircle;

  orderList$: Subscription;
  orderList: Array<IGetOrder>;
  searchString: FormControl;

  constructor(
    private api: ApiService,
    private filter: FilterService,
  ) {
    this.orderList$ = new Subscription();
    this.orderList = [];
    this.searchString = new FormControl('');
  }

  ngOnInit(): void {
    this.api.setFilterableListOfOrders();
    this.orderList$ = this.filter.listOfOrders.subscribe((data: Array<IGetOrder>) => {
      this.orderList = data;
    });
    console.log(this.orderList);
  }

  ngOnDestroy(): void {
    this.orderList$.unsubscribe();
  }

}
