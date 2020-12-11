export default interface ICustomer {
  id: number;
  name: string;
  join_date?: string; // Date.toISOString
  nip: string;
  departaments?: [
    {
      id: number,
      contractor_id: number,
      name: string,
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
  ];
}
