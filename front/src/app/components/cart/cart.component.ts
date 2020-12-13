import { Component, OnInit } from '@angular/core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faCheckCircle = faCheckCircle;
  faShoppingBasket=faShoppingBasket;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
