import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private tokenKey = 'token';  // store token

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http.post('https://dummyjson.com/auth/login', credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);  // Save accessToken
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);  // Retrieve accessToken
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);  // Remove token
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();  // Returns true if token exists
  }
}
