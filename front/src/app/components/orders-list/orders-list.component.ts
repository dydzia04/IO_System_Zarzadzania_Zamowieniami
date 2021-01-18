import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import IGetOrder from '../../interface/IGetOrder';
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
  orderList: IGetOrder[];
  searchString: string;

  constructor(
    private api: ApiService,
  ) {
    this.orderList$ = new Subscription();
    this.orderList = [];
    this.searchString = '';
  }

  ngOnInit(): void {
    this.orderList$ = this.api.getOrdersFromAPI().subscribe((data: Array<IGetOrder>) => {
      this.orderList = data;
    });
  }

  ngOnDestroy(): void {
    this.orderList$.unsubscribe();
  }

  deleteOrderByID( id: number ): void {
    this.api.deleteOrder(id).subscribe();
    this.orderList$ = this.api.getOrdersFromAPI().subscribe( orders => {
      this.orderList = orders;
    });
  }

}
