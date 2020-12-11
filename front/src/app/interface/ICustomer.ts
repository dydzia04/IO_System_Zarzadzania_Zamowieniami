export default interface ICustomer {
  id: number;
  name: string;
  join_date?: string; // Date.toISOString
  nip: string;
  departaments?: [
    {
      id: number;
      contractor_id: number;
      name: string;
      street: string;
      city: string;
      postal_code: string;
      country: string;
      is_main: number;
      contacts: [
        {
          id: number;
          departament_id: number;
          name: string;
          last_name: string;
          email: string;
          phone: string;
        }
      ]
    }
  ];
}
