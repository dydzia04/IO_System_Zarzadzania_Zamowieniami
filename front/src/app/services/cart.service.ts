import {Injectable} from '@angular/core';
import IProduct from '../interface/IProduct';
import ICustomer from '../interface/ICustomer';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Set<IProduct>;
  customer: ICustomer;

  constructor() {
    this.cart = new Set<IProduct>();
    this.customer = {
      NIP: '',
      address: '',
      contact_name: '',
      contact_surname: '',
      created_at: '',
      email: '',
      id: 0,
      name: '',
      orders: [],
      phone: '',
      updated_at: ''
    };
  }

  clearCustomer():void {
    this.customer.NIP='';
    this.customer.address='';
    this.customer.contact_name='';
    this.customer.contact_surname='';
    this.customer.created_at='';
    this.customer.email='';
    this.customer.id=0;
    this.customer.name='';
    this.customer.orders=[];
    this.customer.phone='';
    this.customer.updated_at='';
  }

  addToCart(productToAdd: IProduct): void {
    if (this.cart.has(productToAdd)) {
      this.cart.forEach( product => {
        if (product.id === productToAdd.id) {
          product.pivot.quantity = productToAdd.pivot.quantity;
        }
      });
    }
    else {
      this.cart.add(productToAdd);
    }
  }

  removeFromCart(id: number): void {
    this.cart.forEach(object => {
      if (object.id === id) {
        this.cart.delete(object);
      }
    });
  }
}
