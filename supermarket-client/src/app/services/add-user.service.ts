import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  readonly baseURL = 'http://localhost:5500/api/operations';


  constructor(private httpClient:HttpClient) { }

  insertData(data: any){
    return this.httpClient.post('http://localhost:5500/api/users/add', data);
  }

}
