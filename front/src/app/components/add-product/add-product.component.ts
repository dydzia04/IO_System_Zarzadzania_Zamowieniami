import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import IProduct from '../../interface/IProduct';
import IProductListFromProducts from '../../interface/IProductListFromProducts';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  searchString: string;
  productList: IProductListFromProducts[];

  constructor(
    private api: ApiService,
    private cartService: CartService,
  ) {
    this.productList = [];
    this.searchString = '';

    // dodalem nip tutaj ale chyba powinno byc cos inaczej
    this.api.getProductsFromAPI(this.cartService.customer.NIP).subscribe( products => {
      const product: IProduct = {
        id: 0,
        isService: 0,
        measureUnit: '',
        name: '',
        pivot: { netPrice: 0, order_id: 0, product_id: 0, quantity: 0 },
        product_id: 0,
        vatRate: 0
      };
      product.product_id = products.id;
      product.measureUnit = products.jednostka_miary;
      product.isService = products.czy_usluga;
      product.name = products.nazwa_produktu;
      product.pivot.netPrice = products.cena_netto;
      product.pivot.quantity = 1;
      product.vatRate = products.stawka_VAT;
      this.productList = products;
    });
  }

  ngOnInit(): void {
  }

  addItemToCart(product: IProductListFromProducts): void {
    const produkt: IProduct = {
      id: 0,
      isService: 0,
      measureUnit: '',
      name: '',
      pivot: { netPrice: 0, order_id: 0, product_id: 0, quantity: 0 },
      product_id: 0,
      vatRate: 0
    };
    produkt.product_id = product.id;
    produkt.measureUnit = product.jednostka_miary;
    produkt.isService = product.czy_usluga;
    produkt.name = product.nazwa_produktu;
    produkt.pivot.netPrice = product.cena_netto;
    produkt.pivot.quantity = 1;
    produkt.vatRate = product.stawka_VAT;
    this.cartService.addToCart(produkt);
  }
}
