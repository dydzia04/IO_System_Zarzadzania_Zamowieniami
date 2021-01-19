import { CustomerDetailsComponent } from './../customer-details/customer-details.component';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {CartService} from '../../services/cart.service';
import IProduct from '../../interface/IProduct';
import {MatDialog} from '@angular/material/dialog';
import {SelectCustomerComponent} from '../select-customer/select-customer.component';
import {ApiService} from '../../services/api.service';
import IPostCustomer from '../../interface/IPostCustomer';
import IPostCart from '../../interface/IPostCart';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit, OnDestroy {
  faArrowLeft = faArrowLeft;
  faCheckCircle = faCheckCircle;
  faShoppingBasket = faShoppingBasket;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  creationDate: string;
  fullBruttoPrice: number;
  fullNettoPrice: number;

  constructor(
    public cartService: CartService,
    private dialog: MatDialog,
    private api: ApiService,
    private router: Router,
  ) {
    this.creationDate = new Date( Date.now() ).toISOString().split('T')[0];

    this.fullNettoPrice = this.fullBruttoPrice = 0;

    this.cartService.cart.forEach( product => {
      this.fullNettoPrice += product.pivot.netPrice;
      this.fullBruttoPrice += product.pivot.netPrice * product.vatRate * product.pivot.quantity;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  removeFromCart(id: number): void {
    this.cartService.removeFromCart(id);
  }

  increaseQuantity(product: IProduct): void {
    product.pivot.quantity++;
  }

  decreaseQuantity(product: IProduct): void {
    product.pivot.quantity--;
  }

  selectCustomer(): void {
    this.dialog.open(SelectCustomerComponent);
  }

  addOrder(): void {
    const postCustomer: IPostCustomer = {
      address: this.cartService.customer.address,
      contact_name: this.cartService.customer.contact_name,
      contact_surname: this.cartService.customer.contact_surname,
      email: this.cartService.customer.email,
      name: this.cartService.customer.name,
      nip: this.cartService.customer.NIP,
      phone: this.cartService.customer.phone
    };
    const postProductsArr: IPostCart[] = [];

    this.cartService.cart.forEach( product => {
      const toPost: IPostCart = {
        isService: product.isService === 1 ? true : false,
        measureUnit: product.measureUnit,
        name: product.name,
        netPrice: product.pivot.netPrice,
        product_id: product.product_id,
        quantity: product.pivot.quantity,
        vatRate: product.vatRate
      };
      postProductsArr.push(toPost);
    });
    this.api.createOrder(postCustomer, postProductsArr).toPromise().then((data) => {
      console.log(data);
      this.cartService.clearCustomer();
      this.router.navigateByUrl('/edit/' + data.id);
    });


  }
  customerInfo(): void{
    const isIndb = false;
    if (isIndb)
    {
      this.router.navigateByUrl('/customer-details/' + this.cartService.customer.NIP);
    }else if ( this.cartService.customer.NIP !== '')
    {
      alert('dane klienta:\nname: ' + this.cartService.customer.name + '\nNIP: '+this.cartService.customer.NIP+'\nAdress: '+this.cartService.customer.address+'\nContact name: '+this.cartService.customer.contact_name);
    }else
    {
      alert('brak danych klienta');
    }
  }
}
