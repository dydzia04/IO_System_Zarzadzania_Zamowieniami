import {Component, OnDestroy, OnInit} from '@angular/core';
import IProduct from '../../interface/IProduct';
import IProductListFromProducts from '../../interface/IProductListFromProducts';
import {Subscription} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {CartService} from '../../services/cart.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import _ from 'lodash';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  faShoppingCart = faShoppingCart;
  productList$: Subscription;
  productList: Array<IProductListFromProducts>;
  searchString: string;

  constructor(
    private api: ApiService,
    private cart: CartService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.productList$ = new Subscription();
    this.productList = new Array<IProductListFromProducts>();
    this.searchString = '';
  }
  ngOnInit(): void {
    this.productList$ = this.api.getProductsFromAPI(this.cart.customer.NIP).subscribe( (data: any) => {
      const productList = _.flatten([data.products[0], data.products[1]]);
      console.log("Produkty dla "+ this.cart.customer.NIP);
      this.productList = productList;
    });
  }

  ngOnDestroy(): void {
  }

  addObjectToCart( productData: IProductListFromProducts ): void{
    if ( this.cart.customer.NIP === '')
    {
      this.snackBar.open('Nie wybrano kontrahenta. Kontrahent może mieć zniżkę', 'OK', { duration: 6000 });
    }else
    {
      const product: IProduct = {
            id: 0,
            isService: 0,
            measureUnit: '',
            name: '',
            pivot: {netPrice: 0, order_id: 0, product_id: 0, quantity: 0},
            product_id: 0,
            vatRate: 0
          };
      product.product_id = productData.id;
      product.measureUnit = productData.jednostka_miary;
      product.isService = productData.czy_usluga;
      product.name = productData.nazwa_produktu;
      product.pivot.netPrice = productData.cena_netto;
      product.pivot.quantity = 1;
      product.vatRate = productData.stawka_VAT;
      // this.api.getProductByID(objectID).subscribe(data => {
      //   // product.isService=data.
      //   product = data;
      // });
      this.cart.addToCart(product);
      this.router.navigateByUrl('/cart');
    }
  }
}
