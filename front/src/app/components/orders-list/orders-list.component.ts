import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import IOrder from '../../interface/IOrder';
import {FormControl} from '@angular/forms';
import {FilterService} from '../../services/filter.service';
import {Observable, Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orderList$: Subscription;
  orderList: Array<IOrder>;
  searchString: FormControl;

  constructor(
    private apiService: ApiService,
    private filterService: FilterService,
  ) {
    this.orderList$ = new Subscription();
    this.orderList = [];
    this.searchString = new FormControl('');
  }

  ngOnInit(): void {
    this.apiService.setFilterableListOfOrders();
    this.orderList$ = this.filterService.listOfOrders.subscribe( (data: Array<IOrder>) => {
      this.orderList = data;
    });
  }

  ngOnDestroy(): void {
    this.orderList$.unsubscribe();
  }

}
