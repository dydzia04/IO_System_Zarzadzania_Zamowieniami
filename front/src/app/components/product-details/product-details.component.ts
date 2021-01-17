import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import IProduct from '../../interface/IProduct';
import {faArrowLeft, faCogs} from '@fortawesome/free-solid-svg-icons';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faCogs = faCogs;
  product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    this.product = {
      id: 0,
      isService: 0,
      measureUnit: '',
      name: '',
      pivot: {netPrice: 0, order_id: 0, product_id: 0, quantity: 0},
      product_id: 0,
      vatRate: 0
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.api.getProductByID(data.id).subscribe(productData => {
        this.product = productData;
        console.log(this.product);
      });
    });
  }

}
