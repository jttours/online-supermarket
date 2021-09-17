//import { Categories } from './../../../models/categories.ts/categories.ts.module';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Categories } from '../../../models/Categories';

@Component({
  selector: 'shopping-header',
  templateUrl: './shopping-header.component.html',
  styleUrls: ['./shopping-header.component.css']
})
export class ShoppingHeaderComponent implements OnInit {

  categories= [] = Categories;

  @Output() newSelectedCategory = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {


    
  }
  // select a category and filter all products with that category value

  selectedCategory = this.categories[0];
  
  onSelect(category: any): void {
    this.selectedCategory = category;
    console.log('the category is - ', category.name);

    this.newSelectedCategory.emit(category.name);
    //console.log('products2 - ', this.products)

    // this.filteredProducts = this.products.filter(function (item) {
    //   return item.category == category.name;
    // });  
    // console.log('filteredValue',(this.filteredProducts));
  }

  

}
