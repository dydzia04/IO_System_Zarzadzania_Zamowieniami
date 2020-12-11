export default interface IOrder {
  id: number;
  order_name: string;
  status_id: number;
  customer_id: number;
  created_at: string; // Date.toISOString
  updated_at: string; // Date.toISOString
  customer: {
    NIP: string;
    id: number;
  };
}
