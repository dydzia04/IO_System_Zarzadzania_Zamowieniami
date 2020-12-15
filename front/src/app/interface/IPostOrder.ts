export default interface IPostOrder {
  customer: {
    nip: string;
    name: string;
    contact_name: string;
    contact_surname: string;
    email: string;
    phone: string;
    address: string;
    discount: number;
  };
  products: [
    {
      product_id: number;
      name: string;
      price: number;
      description: string;
    }
  ];
}
