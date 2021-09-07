import { Component, OnInit } from '@angular/core';

import { Subscription } from "rxjs";

import { ProductService } from '../../../services/product.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  
  products: Product[] = [];
  private productSubscription!: Subscription;

  

  constructor(private productService: ProductService) { }

  ngOnInit(): void {this.productService.getProducts();
    this.productSubscription = this.productService
      .getProductsStream()
      .subscribe((products: Product[]) => {
        this.products = products;
        console.log(products);
      });
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

}
