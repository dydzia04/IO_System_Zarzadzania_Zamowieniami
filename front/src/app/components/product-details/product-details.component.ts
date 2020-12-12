import { Component, OnInit } from '@angular/core';
import {faCogs} from '@fortawesome/free-solid-svg-icons';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  faCogs = faCogs;
  faArrowLeft = faArrowLeft;
  constructor() { }

  ngOnInit(): void {
  }

}
