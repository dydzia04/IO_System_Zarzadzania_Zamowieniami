import { Pipe, PipeTransform } from '@angular/core';
import IGetOrder from '../interface/IGetOrder';

@Pipe({
  name: 'orderListFilter'
})
export class OrderListFilterPipe implements PipeTransform {

  transform(items: IGetOrder[], search: string): IGetOrder[] {
    if (!items) { return []; }

    if (!search) { return items; }

    search = search.toLowerCase();

    return items.filter( order => order.customer.NIP.toLowerCase().includes(search) || order.order_name.toLowerCase().includes(search));
  }

}
