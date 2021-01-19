import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import IProduct from '../../interface/IProduct';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  searchString: string;
  productList: IProduct[];

  constructor(
    private api: ApiService,
    private cartService: CartService,
  ) {
    this.productList = [];
    this.searchString = '';

    // dodalem nip tutaj ale chyba powinno byc cos inaczej
    this.api.getProductsFromAPI(this.cartService.customer.NIP).subscribe( products => {
      this.productList = products;
    });
  }

  ngOnInit(): void {
  }

  addItemToCart(product: IProduct): void {
    this.cartService.addToCart(product);
  }
}
