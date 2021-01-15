import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import _ from 'lodash';
import IStatus from 'src/app/interface/IStatus';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit, OnDestroy, AfterViewInit {
  //@ts-ignore
  @ViewChild('statusSelect') statusSelect: ElementRef;

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;
  faArrowLeft = faArrowLeft;
  faCheckCircle = faCheckCircle;

  order$: Subscription;
  order: IGetOrder;
  status$: Subscription;
  statuses: IStatus[];
  orderProductsList: Array<any>;
  dateModified: string;
  dateCreated: string;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {
    this.order$ = new Subscription();
    this.status$ = new Subscription();
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
    this.statuses = [];
    this.orderProductsList = new Array();
    this.dateCreated = this.dateModified = '';

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
          this.dateCreated = new Date(this.order.created_at).toDateString();
          this.dateModified = new Date(this.order.updated_at).toDateString();
        });
      })
      .unsubscribe();

    this.status$ = this.api.getStatuses().subscribe( data => {
      this.statuses = data;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // TODO
    this.statuses.forEach(status => {
      const opt = document.createElement('option');
      opt.innerHTML = status.name;
      opt.value = status.id + '';

      this.statusSelect.nativeElement.appendChild(opt);
    });
  }

  ngOnDestroy(): void {
    this.order$.unsubscribe();
  }

  increaseProductQuantity(index: number): void {
    this.orderProductsList[index].quantity++;
  }

  decreaseProductQuantity(index: number): void {
    this.orderProductsList[index].quantity--;
  }

  deleteProduct(index: number): void {
    this.orderProductsList.splice(index, 1);
  }

  setDateOfCreation(event: Event): void {
    //@ts-ignore
    this.order.created_at = event.target.value;
    this.dateCreated = new Date(this.order.created_at).toDateString();
  }

  saveModifiedOrder(): void {
    // TODO
  }
}
