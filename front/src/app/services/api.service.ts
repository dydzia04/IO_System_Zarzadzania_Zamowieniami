import {Injectable} from '@angular/core';
import IProduct from '../interface/IProduct';
import IGetOrder from '../interface/IGetOrder';
import ICustomer from '../interface/ICustomer';
import {FilterService} from './filter.service';
import {HttpClient} from '@angular/common/http';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private exampleListOfProducts: Array<Array<IProduct>>;
  private exampleOrder: IGetOrder;
  private exampleListOfCustomers: Array<ICustomer>;
  private exampleCustomer: ICustomer;

  constructor(
    private filterService: FilterService,
    private http: HttpClient,
  ) {
    this.exampleListOfProducts = [
      [
        {
          id: 2,
          nazwa_produktu: 'asperiores',
          cena_netto: 30.54,
          podatek: 1.23,
          opis: 'Harum autem nihil fugit ut vel omnis atque.',
          czy_usluga: 1
        },
        {
          id: 3,
          nazwa_produktu: 'ea',
          cena_netto: 186.39,
          podatek: 1.05,
          opis: 'Mollitia praesentium voluptatem est distinctio vel.',
          czy_usluga: 1
        },
        {
          id: 4,
          nazwa_produktu: 'iste',
          cena_netto: 297.11,
          podatek: 1.05,
          opis: 'Vitae nisi consequatur corrupti error nesciunt exercitationem.',
          czy_usluga: 0
        },
        {
          id: 5,
          nazwa_produktu: 'laudantium',
          cena_netto: 467.36,
          podatek: 1.23,
          opis: 'In voluptatem nihil nesciunt illum.',
          czy_usluga: 0
        },
        {
          id: 6,
          nazwa_produktu: 'provident',
          cena_netto: 193.32,
          podatek: 1.08,
          opis: 'Doloremque mollitia sint quis sint.',
          czy_usluga: 0
        },
        {
          id: 7,
          nazwa_produktu: 'nobis',
          cena_netto: 824.02,
          podatek: 1.23,
          opis: 'Quam sint beatae qui unde voluptatum.',
          czy_usluga: 1
        },
        {
          id: 8,
          nazwa_produktu: 'voluptatem',
          cena_netto: 578.17,
          podatek: 1.08,
          opis: 'Magnam odio rerum iusto totam minus.',
          czy_usluga: 1
        },
        {
          id: 9,
          nazwa_produktu: 'id',
          cena_netto: 923.31,
          podatek: 1.08,
          opis: 'Qui quia expedita qui.',
          czy_usluga: 1
        },
        {
          id: 10,
          nazwa_produktu: 'consequatur',
          cena_netto: 134.1,
          podatek: 1,
          opis: 'Quos eveniet voluptatum odit hic libero consequatur.',
          czy_usluga: 0
        },
        {
          id: 11,
          nazwa_produktu: 'soluta',
          cena_netto: 117.62,
          podatek: 1.05,
          opis: 'Minima aut quis rerum sunt beatae.',
          czy_usluga: 1
        },
        {
          id: 12,
          nazwa_produktu: 'sunt',
          cena_netto: 308.33,
          podatek: 1.23,
          opis: 'Sit voluptatem autem modi ut repudiandae qui sit.',
          czy_usluga: 0
        },
        {
          id: 13,
          nazwa_produktu: 'nobis',
          cena_netto: 829.62,
          podatek: 1.05,
          opis: 'Saepe fugit voluptatum saepe molestiae hic.',
          czy_usluga: 1
        },
        {
          id: 14,
          nazwa_produktu: 'ut',
          cena_netto: 609.43,
          podatek: 1.23,
          opis: 'Sed suscipit dolor aut consequatur.',
          czy_usluga: 0
        },
        {
          id: 15,
          nazwa_produktu: 'in',
          cena_netto: 896.29,
          podatek: 1,
          opis: 'Suscipit voluptatibus suscipit ea non atque dignissimos voluptatibus.',
          czy_usluga: 1
        },
        {
          id: 16,
          nazwa_produktu: 'omnis',
          cena_netto: 97.43,
          podatek: 1,
          opis: 'Numquam ab dolorem distinctio dolorem accusantium omnis quia.',
          czy_usluga: 0
        },
        {
          id: 17,
          nazwa_produktu: 'suscipit',
          cena_netto: 879.4,
          podatek: 1.05,
          opis: 'Dolorum sapiente unde pariatur ea sit.',
          czy_usluga: 0
        },
        {
          id: 18,
          nazwa_produktu: 'voluptates',
          cena_netto: 20.49,
          podatek: 1.23,
          opis: 'Soluta ut saepe quo et nobis perspiciatis.',
          czy_usluga: 1
        },
        {
          id: 19,
          nazwa_produktu: 'dolor',
          cena_netto: 486.06,
          podatek: 1.23,
          opis: 'Repellendus fugit sequi a et.',
          czy_usluga: 1
        },
        {
          id: 20,
          nazwa_produktu: 'dolor',
          cena_netto: 314.44,
          podatek: 1.05,
          opis: 'Laboriosam doloremque quod et quas quibusdam iusto repellendus et.',
          czy_usluga: 0
        }
      ],
      [
        {
          id: 1,
          nazwa_produktu: 'rerum',
          cena_netto: 361.57,
          podatek: 1.23,
          opis: 'Et et magnam et minus fugiat est tempore inventore.',
          czy_usluga: 0,
          pivot: {
            produkt_kontrahent: 1,
            cena: 33.03
          }
        }
      ]
    ];
    this.exampleOrder = {
      id: 1,
      order_name: '',
      customer_id: 1,
      created_at: '',
      updated_at: '',
      status: {
        id: 1,
        name: ''
      },
      customer: {
        NIP: '',
        id: 1,
        name: 'name',
        contact_name: 'elo',
        contact_surname: 'DŁ',
        email: 'xd@xd.com',
        phone: '123-123-123',
        address: 'adres',
        created_at: '2020-11-30 22:23:39',
        updated_at: '2020-11-30 22:23:39',
        discount: '0.00'
      },
      products: [
        {
          id: 1,
          product_id: 1,
          name: '',
          price: '',
          description: '',
          isService: 0,
          pivot: {
            order_id: 1,
            product_id: 1,
            quantity: 15,
            discountedPrice: 0.12
          }
        },
      ]
    };
    this.exampleListOfCustomers = [
      {
        id: 5,
        name: 'Feest Group',
        nip: '2679130872'
      },
      {
        id: 6,
        name: 'Marquardt, Mueller and Mosciski',
        nip: '4882099562'
      },
      {
        id: 7,
        name: 'Stroman, Pfannerstill and Rogahn',
        nip: '8661236241'
      },
      {
        id: 8,
        name: 'Kessler, O\'Keefe and Gutmann',
        nip: '6621565398'
      },
      {
        id: 9,
        name: 'Moen and Sons',
        nip: '1977970784'
      },
      {
        id: 10,
        name: 'Wunsch, Klein and Rodriguez',
        nip: '7633685874'
      },
      {
        id: 11,
        name: 'Watsica LLC',
        nip: '8977246864'
      },
      {
        id: 12,
        name: 'Donnelly, Toy and Ledner',
        nip: '3862219048'
      },
      {
        id: 13,
        name: 'Lang and Sons',
        nip: '7040581425'
      },
      {
        id: 14,
        name: 'Hermann PLC',
        nip: '8538461611'
      }
    ];
    this.exampleCustomer = {
      id: 6,
      name: 'Marquardt, Mueller and Mosciski',
      join_date: '1978-10-29T21:04:55.000000Z',
      nip: '4882099562',
      departaments: [
        {
          id: 6,
          contractor_id: 6,
          name: 'Crist LLC',
          street: '35176 Nicklaus Shore Apt. 296, 33797',
          city: 'North Maud',
          postal_code: '32830',
          country: 'Saint Martin',
          is_main: 1,
          contacts: [
            {
              id: 6,
              departament_id: 6,
              name: 'Della Feil V',
              last_name: 'Medhurst',
              email: 'sammie02@hotmail.com',
              phone: '243605272'
            }
          ]
        }
      ]
    };
  }

  setFilterableListOfOrders(listOfOrders?: Array<IGetOrder>): void {
    const toRet: Array<IGetOrder> = [];
    for (let i = 0; i < 20; i++) {
      toRet.push(this.exampleOrder);
    }
    this.filterService.setNewListOfOrders(toRet);
  }

  setFilterableListOfProducts(listOfProducts?: Array<IProduct>): void {
    // _.flatten wypłaszcza tablicę
    this.filterService.setNewListOfProducts(_.flatten(this.exampleListOfProducts));
  }

  setFilterableListOfCustomers(listOfCustomers?: Array<ICustomer>): void {
    this.filterService.setNewListOfCustomers(this.exampleListOfCustomers);
  }

  getOrdersFromAPI(): void {
    const url = '';
    this.http.get<Array<IGetOrder>>(url)
      .subscribe(list => {
        this.setFilterableListOfOrders(list);
      });
  }

  getProductsFromAPI(): void {
    const url = '';
    this.http.get<Array<IProduct>>(url)
      .subscribe(list => {
        this.setFilterableListOfProducts(list);
      });
  }

  getCustomersFromAPI(): void {
    const url = '';
    this.http.get<Array<ICustomer>>(url)
      .subscribe(list => {
        this.setFilterableListOfCustomers(list);
      });
  }
}
