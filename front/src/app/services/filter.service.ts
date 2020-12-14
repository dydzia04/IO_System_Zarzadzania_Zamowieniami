import {Injectable} from '@angular/core';
import ICustomer from '../interface/ICustomer';
import IGetOrder from '../interface/IGetOrder';
import IProduct from '../interface/IProduct';
import {BehaviorSubject, Observable} from 'rxjs';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _listOfCustomers: BehaviorSubject<Array<ICustomer>>;
  private _listOfOrders: BehaviorSubject<Array<IGetOrder>>;
  private _listOfProducts: BehaviorSubject<Array<IProduct>>;

  constructor() {
    this._listOfCustomers = new BehaviorSubject<Array<ICustomer>>([{id: 0, name: '', nip: ''}]);
    this._listOfOrders = new BehaviorSubject<Array<IGetOrder>>([]);
    this._listOfProducts = new BehaviorSubject<Array<IProduct>>([
      {cena_netto: 0, czy_usluga: 0, id: 0, nazwa_produktu: '', opis: '', podatek: 0}
    ]);
  }

  get listOfCustomers(): Observable<Array<ICustomer>> {
    return this._listOfCustomers.asObservable();
  }

  get listOfOrders(): Observable<Array<IGetOrder>> {
    return this._listOfOrders.asObservable();
  }

  get listOfProducts(): Observable<Array<IProduct>> {
    return this._listOfProducts.asObservable();
  }

  setNewListOfCustomers(value: Array<ICustomer>): void {
    this._listOfCustomers.next(value);
  }

  setNewListOfOrders(value: Array<IGetOrder>): void {
    this._listOfOrders.next(value);
  }

  setNewListOfProducts(value: Array<IProduct>): void {
    this._listOfProducts.next(value);
  }

  getProductByID(argID: number): any {
    let products = {};
    const list$ = this.listOfProducts
      .subscribe(data => {
        products = data;
      });
    list$.unsubscribe();
    // tslint:disable-next-line:triple-equals
    return _.find(products, (object: IProduct) => object.id == argID);
  }
}
