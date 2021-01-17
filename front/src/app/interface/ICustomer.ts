import ICustomerOrder from './ICustomerOrder';

export default interface ICustomer {
  'id': number;
  'NIP': string;
  'name': string;
  'contact_name': string;
  'contact_surname': string;
  'email': string;
  'phone': string;
  'address': string;
  'created_at': string;
  'updated_at': string;
  'orders': ICustomerOrder[];
}
