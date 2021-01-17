import {Component, OnDestroy, OnInit} from '@angular/core';
import IProduct from '../../interface/IProduct';
import {Subscription} from 'rxjs';
import {ApiService} from '../../services/api.service';
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
  searchString: string;

  constructor(
    private api: ApiService,
    private cart: CartService,
  ) {
    this.productList$ = new Subscription();
    this.productList = new Array<IProduct>();
    this.searchString = '';
  }

  ngOnInit(): void {
    this.productList$ = this.api.getProductsFromAPI().subscribe( (data: Array<IProduct>) => {
      this.productList = data;
    });
  }

  ngOnDestroy(): void {
  }

  addObjectToCart( objectID: number ): void{
    let product: IProduct = {
      id: 0,
      isService: 0,
      measureUnit: '',
      name: '',
      pivot: {netPrice: 0, order_id: 0, product_id: 0, quantity: 0},
      product_id: 0,
      vatRate: 0
    };
    this.api.getProductByID(objectID).subscribe(data => {
      product = data;
    });
    this.cart.addToCart(product);
  }
}
