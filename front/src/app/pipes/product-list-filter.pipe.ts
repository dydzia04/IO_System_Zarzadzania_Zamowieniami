import { Pipe, PipeTransform } from '@angular/core';
import IProductListFromProducts from '../interface/IProductListFromProducts';

@Pipe({
  name: 'productListFilter'
})
export class ProductListFilterPipe implements PipeTransform {

  transform(items: IProductListFromProducts[], search: string): IProductListFromProducts[] {
    if (!items) { return []; }

    if (!search) { return items; }

    search = search.toLowerCase();

    return items.filter( product => product.nazwa_produktu.toLowerCase().includes(search));
  }

}
