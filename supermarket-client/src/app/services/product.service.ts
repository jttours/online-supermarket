import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from "rxjs/operators";

import { Product } from '../models/Product';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private products$ = new Subject<Product[]>();
  readonly baseURL = 'http://localhost:5500/api/products/add';
  readonly baseURL2 = 'http://localhost:5500/api/products/getAllProducts';

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    this.httpClient
      .get<{ products: Product[] }>(this.baseURL2)
      .pipe(
        map((productData) => {
          return productData.products;
        })
      )
      .subscribe((products) => {
        this.products = products;
        this.products$.next(this.products);
      });
  }

  getProductsStream() {
    return this.products$.asObservable();
  }

  addProduct(name: string, image: File, price: number, category: string){

    const productData = new FormData();
    productData.append("name", name);
    productData.append("image", image);
    productData.append("price", price.toString());
    productData.append("category", category);
    this.httpClient
      .post<{ product: Product }>(this.baseURL, productData)
      .subscribe((productData) => {
        const product: Product = {
          name: name,
          image: image,
          price: price,
          category: category,
        };
      });
  }


  



}
