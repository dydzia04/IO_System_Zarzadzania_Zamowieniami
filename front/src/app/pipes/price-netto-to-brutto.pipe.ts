import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceNettoToBrutto'
})
export class PriceNettoToBruttoPipe implements PipeTransform {

  transform(value: number, vatRate: number): string {
    return parseFloat((value * vatRate).toString()).toFixed(2).toString();
  }

}
