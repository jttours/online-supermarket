import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';

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
  faarrowsalth=faArrowsAltH;
  
  
  

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

  
}
