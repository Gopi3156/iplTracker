import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/auth';
  private currentUser: any = null;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap(response => {
        // Store the token if it's returned from the backend
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.currentUser = response.user;
        }
      })
    );
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        // Store the token if it's returned from the backend
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.currentUser = response.user;
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
} 