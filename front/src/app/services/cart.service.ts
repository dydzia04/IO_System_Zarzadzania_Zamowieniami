import {Injectable} from '@angular/core';
import IProduct from '../interface/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart: Set<IProduct>;
  private _quantityOfProducts: Array<{ id: number; quantity: number; }>;

  constructor() {
    this._cart = new Set<IProduct>();
    this._quantityOfProducts = [];

    this._cart.forEach( product => {
      this._quantityOfProducts.push({
        id: product.id,
        quantity: 0,
      });
    });
  }

  get cart(): Set<IProduct> {
    return this._cart;
  }

  set quantityOfProducts(value: Array<{ id: number; quantity: number }>) {
    this._quantityOfProducts = value;
  }
  get quantityOfProducts(): Array<{ id: number; quantity: number }> {
    return this._quantityOfProducts;
  }

  addToCart(product: IProduct): void {
    // add check if product is in cart, if is then update
    this._cart.add(product);
    this._quantityOfProducts.push({
      id: product.id,
      quantity: 0,
    });
  }

  removeFromCart(id: number): void {
    const product = [...this._cart].filter(object => object.id === id);
    console.log(product);
    // this.cart.delete();
  }
}
