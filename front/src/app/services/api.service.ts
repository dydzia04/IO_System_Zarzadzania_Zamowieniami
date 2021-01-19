import {Injectable} from '@angular/core';
import IGetOrder from '../interface/IGetOrder';
import ICustomer from '../interface/ICustomer';
import IContractor from '../interface/IContractor';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import IStatus from '../interface/IStatus';
import IPostOrder from '../interface/IPostOrder';
import IDeletedOrder from '../interface/IDeletedOrder';
import IProduct from '../interface/IProduct';
import IPostCustomer from '../interface/IPostCustomer';
import IPostProduct from '../interface/IPostProduct';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private PORT = '8000';
  // private PORT = '4040';
  private BASE = `http://127.0.0.1:${this.PORT}/api`;
  private BASE_PRODUCTS = 'https://e19965f9-66d1-4f66-b3dd-a2d4d2006af1.mock.pstmn.io/produktypoNipie';
  private BASE_CLIENTS = 'https://dd817dab-0c7c-4dda-87f5-3ca9912b95eb.mock.pstmn.io/api/contractor/123213';
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
    return this.http.get( this.BASE + `/customers/${nip}`) as Observable<ICustomer>;
  }

  getCustomerByNipFromContractors(nip: string): Observable<any> {
    return this.http.get( this.BASE_CLIENTS + `/${nip}`) as Observable<any>;
  }

  getProductsFromAPI(nip: string): Observable<any> {
    // return new Observable<IProduct[]>();
    const data = this.http.get(this.BASE_PRODUCTS + `/${nip}`);
    return data as any;
  }

  getProductByID(objectID: number): Observable<IProduct> {
    return new Observable<IProduct>();
    // return this.http.get(this.BASE_PRODUCTS) as Observable<IProduct>;
  }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get( this.BASE + this.CUSTOMERS ) as Observable<ICustomer[]>;
  }

  createOrder(customerParam: IPostCustomer, cart: IPostProduct[]): Observable<any> {
    console.log(customerParam);
    console.log(cart);
    return this.http.post( this.BASE + this.ORDERS ,
      {
        customer: customerParam,
        products: cart
      });
  }
}
