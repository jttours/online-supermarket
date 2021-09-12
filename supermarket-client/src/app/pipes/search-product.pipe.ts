import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(searchProducts: any[], searchText: string): any[] {
    if (!searchProducts) {
      return [];
    }
    if (!searchText) {
      return searchProducts;
    }
    searchText = searchText.toLocaleLowerCase();

    return searchProducts.filter(sp => {
      return sp.toLocaleLowerCase().includes(searchText);
    });
  }

}
