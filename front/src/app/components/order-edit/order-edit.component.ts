import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import IGetOrder from 'src/app/interface/IGetOrder';
import { ApiService } from 'src/app/services/api.service';
import IStatus from 'src/app/interface/IStatus';
import IProduct from '../../interface/IProduct';
import IPostOrder from '../../interface/IPostOrder';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {AddProductComponent} from '../add-product/add-product.component';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css'],
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
  status$: Subscription;
  statuses: IStatus[];
  orderProductsList: Array<IProduct>;
  dateModified: string;
  dateCreated: string;
  private fullNettoPriceNum = 0;
  private fullBruttoPriceNum = 0;
  fullNettoPriceStr: string;
  fullBruttoPriceStr: string;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.dateCreated = this.dateModified = '';
    this.fullBruttoPriceStr = '';
    this.fullNettoPriceStr = '';
    this.order$ = new Subscription();
    this.status$ = new Subscription();
    this.order = {
      created_at: '',
      customer: {NIP: '', id: 0, name: ''},
      customer_id: 0,
      id: 0,
      order_name: '',
      products: [],
      status: { id: 0, name: ''},
      status_id: 0,
      updated_at: ''
    };
    this.statuses = [];
    this.orderProductsList = [];
    this.route.params
      .subscribe(data => {
        this.order$ = this.api.getOrderByID(data.id).subscribe( orderData => {
          this.order = orderData;
          this.order.products.forEach(element => {
            this.orderProductsList.push({
              id: element.id,
              isService: element.isService,
              measureUnit: element.measureUnit,
              name: element.name,
              pivot: {
                netPrice: element.pivot.netPrice,
                order_id: element.pivot.order_id,
                product_id: element.pivot.product_id,
                quantity: element.pivot.quantity
              },
              product_id: element.product_id,
              vatRate: element.vatRate
            });

            this.fullNettoPriceNum += element.pivot.netPrice * element.pivot.quantity;
            this.fullBruttoPriceNum += parseFloat(parseFloat(
              (element.pivot.netPrice * element.vatRate)
                .toString()
            ).toFixed(2)) * element.pivot.quantity;
          });

          this.fullBruttoPriceStr = this.fullBruttoPriceNum.toFixed(2);
          this.fullNettoPriceStr = this.fullNettoPriceNum.toFixed(2);

          this.dateCreated = new Date(this.order.created_at).toDateString();
          this.dateModified = new Date(this.order.updated_at).toDateString();
        });
      })
      .unsubscribe();

    this.status$ = this.api.getStatuses().subscribe( data => {
      this.statuses = data;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.order$.unsubscribe();
  }

  private resetSums(): void {
    this.fullBruttoPriceNum = this.fullNettoPriceNum = 0;

    this.orderProductsList.forEach(product => {
      this.fullNettoPriceNum += product.pivot.netPrice * product.pivot.quantity;
      this.fullBruttoPriceNum += parseFloat(parseFloat(
        (product.pivot.netPrice * product.vatRate)
          .toString()
      ).toFixed(2)) * product.pivot.quantity;
    });

    this.fullBruttoPriceStr = this.fullBruttoPriceNum.toFixed(2);
    this.fullNettoPriceStr = this.fullNettoPriceNum.toFixed(2);

    this.order.products = this.orderProductsList;
  }

  increaseProductQuantity(index: number): void {
    this.orderProductsList[index].pivot.quantity++;
    this.resetSums();
  }

  decreaseProductQuantity(index: number): void {
    this.orderProductsList[index].pivot.quantity--;
    this.resetSums();
  }

  deleteProduct(index: number): void {
    this.orderProductsList.splice(index, 1);
    this.resetSums();
  }

  saveModifiedOrder(): void {
    const orderToSent: IPostOrder = {products: [], status_id: 0};

    orderToSent.status_id = this.order.status_id;

    this.order.products.forEach(product => {
      orderToSent.products.push({
        isService: !!product.isService,
        measureUnit: product.measureUnit,
        name: product.name,
        netPrice: product.pivot.netPrice,
        product_id: product.product_id,
        quantity: product.pivot.quantity,
        vatRate: product.vatRate
      });
    });

    this.api.updateOrder(this.order.id, orderToSent).subscribe( data => {
      this.snackBar.open(`Zakutalizowano zamówienie`, 'OK' , {duration: 1000});
    });
  }

  addProduct(): void {
    this.dialog.open(AddProductComponent);
  }
}
