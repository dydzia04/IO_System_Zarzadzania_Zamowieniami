import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import IGetOrder from 'src/app/interface/IGetOrder';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit, OnDestroy {
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;
  faArrowLeft = faArrowLeft;
  faCheckCircle = faCheckCircle;

  order$: Subscription;
  order: IGetOrder;
  orderProductsList: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {
    this.order$ = new Subscription();
    this.order = {
      id: 0,
      order_name: '',
      customer_id: 1,
      created_at: '',
      updated_at: '',
      status: {
        id: 1,
        name: '',
      },
      customer: {
        NIP: '',
        id: 1,
        name: '',
        contact_name: '',
        contact_surname: '',
        email: '',
        phone: '',
        address: '',
        created_at: '',
        updated_at: '',
        discount: '',
      },
      products: [
        {
          id: 1,
          product_id: 1,
          name: '',
          price: '',
          description: '',
          isService: 1,
          pivot: {
            order_id: 1,
            product_id: 1,
            quantity: 1,
          }
        },
      ]
    };
    this.orderProductsList = new Array();

    this.route.params
      .subscribe(data => {
        this.order$ = this.api.getOrderByID(data.id).subscribe( data => {
          this.order = data;
          this.order.products.forEach(element => {
            this.orderProductsList.push({
              productID: element.id,
              name: element.name,
              price: element.price,
              quantity: element.pivot.quantity
            });
          });
        });
      })
      .unsubscribe();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.order$.unsubscribe();
  }
}
