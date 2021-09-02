import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private products$ = new Subject<Product[]>();
  readonly baseURL = 'http://localhost:5500/api/products/add';

  constructor(private httpClient: HttpClient) { }

  addProduct(name: string, image: File, price: number, imageData: string, category: string){
    console.log('will this work?    - ',name, image, price, imageData, category);
    // return this.httpClient.post('http://localhost:5500/api/products/add', data);

    const productData = new FormData();
    productData.append("name", name);
    productData.append("image", image);
    productData.append("price", price.toString());
    productData.append("imageData", imageData);
    productData.append("category", category);
    this.httpClient
      .post<{ product: Product }>(this.baseURL, productData)
      .subscribe((productData) => {
        const product: Product = {
          // _id: productData.product._id,
          name: name,
          image: image,
          price: price,
          imageData: imageData,
          category: category,
        };
        // this.products.push(product);
        // this.products$.next(this.products);
      });
  }


  



}
