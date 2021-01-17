import IStatus from './IStatus';
import IProduct from './IProduct';

export default interface IGetOrder {
  id: number;
  order_name: string;
  status_id: number;
  customer_id: number;
  created_at: string;
  updated_at: string;
  customer: {
    id: number,
    NIP: string,
    name: string,
  };
  status: IStatus;
  products: IProduct[];
}
