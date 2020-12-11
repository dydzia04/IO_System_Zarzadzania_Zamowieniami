import {Injectable} from '@angular/core';
import ICustomer from '../interface/ICustomer';
import IOrder from '../interface/IOrder';
import IProduct from '../interface/IProduct';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _listOfCustomers: BehaviorSubject<Array<ICustomer>>;
  private _listOfOrders: BehaviorSubject<Array<IOrder>>;
  private _listOfProducts: BehaviorSubject<Array<IProduct>>;

  constructor() {
    this._listOfCustomers = new BehaviorSubject<Array<ICustomer>>([{id: 0, name: '', nip: ''}]);
    this._listOfOrders = new BehaviorSubject<Array<IOrder>>([{
      created_at: '',
      customer: {NIP: '', id: 0},
      customer_id: 0,
      id: 0,
      order_name: '',
      status_id: 0,
      updated_at: ''
    }]);
    this._listOfProducts = new BehaviorSubject<Array<IProduct>>([
      {cena_netto: 0, czy_usluga: 0, id: 0, nazwa_produktu: '', opis: '', podatek: 0}
    ]);
  }

  get listOfCustomers(): Observable<Array<ICustomer>> {
    return this._listOfCustomers.asObservable();
  }

  get listOfOrders(): Observable<Array<IOrder>> {
    return this._listOfOrders.asObservable();
  }

  get listOfProducts(): Observable<Array<IProduct>> {
    return this._listOfProducts.asObservable();
  }

  setNewListOfCustomers(value: Array<ICustomer>): void {
    this._listOfCustomers.next(value);
  }

  setNewListOfOrders(value: Array<IOrder>): void {
    this._listOfOrders.next(value);
  }

  setNewListOfProducts(value: Array<IProduct>): void {
    this._listOfProducts.next(value);
  }
}
