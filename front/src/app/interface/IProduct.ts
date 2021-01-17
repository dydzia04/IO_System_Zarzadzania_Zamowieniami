export default interface IProduct {
  id: number;
  product_id: number;
  name: string;
  vatRate: number;
  measureUnit: string;
  isService: number;
  pivot: {
    order_id: number;
    product_id: number;
    quantity: number;
    netPrice: number;
  };
}
