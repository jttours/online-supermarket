import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';

import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {

  public resize: boolean = false;
  private productSubscription!: Subscription;
  product!: Product;
  products: Product[] = [];
  page: any;
  maxSize = 12;
  pageSecond: any;
  filteredProducts: any;
  
  
  
  

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }
  

  ngOnInit(): void {
    this.productService.getProducts();
    this.productSubscription = this.productService
      .getProductsStream()
      .subscribe((products: Product[]) => {
        this.products = products;
        console.log('shopping - ',products);
      });
  }
  resizePage(){
    this.resize = !this.resize;    
  }   

  shoppingSelectedCategory(newSelectedCategory : string) {
    console.log('new selected category',newSelectedCategory);

    this.filteredProducts = this.products.filter(function (item) {
      return item.category == newSelectedCategory;
    });  
    console.log('filteredValue',(this.filteredProducts));
  }

  
}
