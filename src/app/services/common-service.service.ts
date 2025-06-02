import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  userApiUrl="https://dummyjson.com/users"
  productApiUrl="https://dummyjson.com/products"
  constructor(public http:HttpClient) { }

  getUserData(): Observable<any> {
    return this.http.get<any>(this.userApiUrl);
  }

  getProductData(): Observable<any> {
    return this.http.get<any>(this.productApiUrl);
  }
 
}
