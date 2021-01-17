import { Pipe, PipeTransform } from '@angular/core';
import IProduct from '../interface/IProduct';

@Pipe({
  name: 'productListFilter'
})
export class ProductListFilterPipe implements PipeTransform {

  transform(items: IProduct[], search: string): IProduct[] {
    if (!items) { return []; }

    if (!search) { return items; }

    search = search.toLowerCase();

    return items.filter( product => product.name.toLowerCase().includes(search));
  }

}
