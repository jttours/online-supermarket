import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }


  addToCart(data: any){
    console.log('data in cart service - ', data);
    return this.httpClient.post('http://localhost:5500/api/addToCart', data);
  }

  getCart(cartCurrentUser_Id: any){
    console.log('user to get cart for - ', cartCurrentUser_Id);
    return this.httpClient.get('http://localhost:5500/api/getCart/'+cartCurrentUser_Id);
  }

}
