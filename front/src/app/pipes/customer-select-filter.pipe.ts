import { Pipe, PipeTransform } from '@angular/core';
import ICustomer from '../interface/ICustomer';

@Pipe({
  name: 'customerSelectFilter'
})
export class CustomerSelectFilterPipe implements PipeTransform {

  transform(items: ICustomer[], search: string): ICustomer[] {
    if (!items) { return []; }

    if (!search) { return items; }

    search = search.toLowerCase();

    return items.filter( customer => customer.NIP.toLowerCase().includes(search));
  }

}
