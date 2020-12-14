export default interface IGetOrder {
  id: number;
  order_name: string;
  customer_id: number;
  created_at: string; // Date.toISOString
  updated_at: string; // Date.toISOString
  status: {
    id: number;
    name: string;
  };
  customer: {
    NIP: string;
    id: number;
    name: string;
    contact_name: string;
    contact_surname: string;
    email: string;
    phone: string;
    address: string
    created_at: string; // Date.toISOString
    updated_at: string; // Date.toISOString
    discount: string;
  };
  products: [
    {
      id: number;
      product_id: number;
      name: string;
      price: string;
      description: string;
      isService: number;
      pivot: {
        order_id: number;
        product_id: number;
        quantity: number;
        discountedPrice?: number;
      };
    },
  ];
}
