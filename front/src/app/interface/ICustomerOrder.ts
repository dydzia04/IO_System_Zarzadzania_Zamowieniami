import IStatus from './IStatus';

export default interface ICustomerOrder {
  'id': number;
  'order_name': string;
  'status_id': number;
  'customer_id': number;
  'created_at': string;
  'updated_at': string;
  'status': IStatus;
}
