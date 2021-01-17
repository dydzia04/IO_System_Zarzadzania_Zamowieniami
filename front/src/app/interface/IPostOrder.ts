import IPostProduct from './IPostProduct';

export default interface IPostOrder {
  'status_id': number;
  'products': IPostProduct[];
}
