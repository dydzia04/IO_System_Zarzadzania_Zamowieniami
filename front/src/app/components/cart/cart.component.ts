import {Component, OnDestroy, OnInit} from '@angular/core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {CartService} from '../../services/cart.service';
import IProduct from '../../interface/IProduct';

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

  cartArr: Array<IProduct>;
  quantities: Array<{ id: number; quantity: number; }>;
  creationDate: string;

  constructor(
    private cart: CartService,
  ) {
    this.cartArr = [...this.cart.cart];
    this.quantities = [...this.cart.quantityOfProducts];
    this.creationDate = new Date( Date.now() ).toISOString().split('T')[0];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.cart.quantityOfProducts = this.quantities;
  }

  removeFromCart(id: number): void {
    this.cart.removeFromCart(id);
  }

  increaseQuantity(i: number): void {
    this.quantities[i].quantity++;
  }

  decreaseQuantity(i: number): void {
    this.quantities[i].quantity--;
  }

  selectCustomerForOrder(): void {}
}
