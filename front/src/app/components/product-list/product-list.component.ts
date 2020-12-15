import {Component, OnDestroy, OnInit} from '@angular/core';
import IProduct from '../../interface/IProduct';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {FilterService} from '../../services/filter.service';

import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  faShoppingCart = faShoppingCart;
  productList$: Subscription;
  productList: Array<IProduct>;
  searchString: FormControl;

  constructor(
    private api: ApiService,
    private filter: FilterService,
    private cart: CartService,
  ) {
    this.productList$ = new Subscription();
    this.productList = new Array<IProduct>();
    this.searchString = new FormControl('');
  }

  ngOnInit(): void {
    this.api.setFilterableListOfProducts();
    this.productList$ = this.filter.listOfProducts.subscribe( (data: Array<IProduct>) => {
      this.productList = data;
    });
  }

  ngOnDestroy(): void {
  }

  addObjectToCart( objectID: number ): void{
    const product = this.filter.getProductByID(objectID);
    this.cart.addToCart(product);
  }
}
