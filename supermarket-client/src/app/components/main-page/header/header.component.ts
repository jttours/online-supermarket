import { Component, OnInit } from '@angular/core';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import {MatIconModule} from '@angular/material/icon';
import { Subscription } from "rxjs";

import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from '../../../services/product.service';

import { Product } from '../../../models/Product';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items = {};


  searchText = '';
  products!: Product[];
  private productSubscription!: Subscription;

  constructor(
    public authService: AuthService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {this.productService.getProducts();
    this.productSubscription = this.productService
      .getProductsStream()
      .subscribe((products: Product[]) => {
        this.products = products;
        console.log('header products',products);
      });
  }

}
