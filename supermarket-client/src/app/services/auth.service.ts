import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode, { JwtPayload } from "jwt-decode";
import jwtDecode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();
  
  constructor(
    private httpClient:HttpClient,
    public router: Router
    ) { }

login(credentials: any){
  return this.httpClient.post<any>('http://localhost:5500/api/auth', credentials)
  .subscribe((response: any)=> {
    let token = response;
    if (token) {
      localStorage.setItem('token',token);
      const decoded = this.helper.decodeToken(token);
      console.log('logged in - ',this.helper.isTokenExpired(token));
      // console.log('decoded - ',decoded.firstName);
      this.router.navigate(['/']);
    }
  });
}

logout() {
  localStorage.removeItem('token');
}

isLoggedIn(){
  let token:any = localStorage.getItem('token');
  return !this.helper.isTokenExpired(token);

}


get currentUser() {
  let token = localStorage.getItem('token');
  if (!token) return null;

  return this.helper.decodeToken(token);
}

}
