import {Injectable} from '@angular/core';
import IGetOrder from '../interface/IGetOrder';
import ICustomer from '../interface/ICustomer';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import IStatus from '../interface/IStatus';
import IPostOrder from '../interface/IPostOrder';
import IDeletedOrder from '../interface/IDeletedOrder';
import IProduct from '../interface/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE = 'http://127.0.0.1:8000/api';
  private BASE_PRODUCTS = '';
  private BASE_CLIENTS = '';
  private ORDERS = '/orders';
  private STATUS = '/status';
  private CUSTOMERS = '/customers';

  constructor(
    private http: HttpClient,
  ) {}

  getOrdersFromAPI(): Observable<IGetOrder[]> {
    return this.http.get( this.BASE + this.ORDERS) as Observable<IGetOrder[]>;
  }

  deleteOrder(id: number): Observable<IDeletedOrder> {
    return this.http.delete( this.BASE + this.ORDERS + `/${id}` ) as Observable<IDeletedOrder>;
  }

  getOrderByID(id: number): Observable<IGetOrder> {
    return this.http.get( this.BASE + this.ORDERS + `/${id}`) as Observable<IGetOrder>;
  }

  getStatuses(): Observable<IStatus[]> {
    return this.http.get( this.BASE + this.STATUS ) as Observable<IStatus[]>;
  }

  updateOrder(id: number, orderToSent: IPostOrder): Observable<string> {
    return this.http.put(this.BASE + this.ORDERS + `/${id}`, orderToSent) as Observable<string>;
  }

  getCustomerByNIP(nip: string): Observable<ICustomer> {
    return this.http.get( this.BASE + this.CUSTOMERS + `/${nip}`) as Observable<ICustomer>;
  }

  getProductsFromAPI(): Observable<IProduct[]> {
    return new Observable<IProduct[]>();
    // return this.http.get(this.BASE_PRODUCTS) as Observable<IProduct[]>;
  }

  getProductByID(objectID: number): Observable<IProduct> {
    return new Observable<IProduct>();
    // return this.http.get(this.BASE_PRODUCTS) as Observable<IProduct>;
  }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get( this.BASE + this.CUSTOMERS ) as Observable<ICustomer[]>;
  }
}
