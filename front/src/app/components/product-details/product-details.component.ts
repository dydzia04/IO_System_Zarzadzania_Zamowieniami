import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import IProduct from '../../interface/IProduct';
import {FilterService} from '../../services/filter.service';
import {faArrowLeft, faCogs} from '@fortawesome/free-solid-svg-icons';

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
    private filter: FilterService,
  ) {
    this.product = {cena_netto: 0, czy_usluga: 0, id: 0, nazwa_produktu: '', opis: '', podatek: 0};
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.product = this.filter.getProductByID(data.id);
      console.log(this.product);
    });
  }

}
