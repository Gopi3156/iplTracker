import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  setAdminStatus(userId: string, isAdmin: boolean): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${userId}/admin-status`, { isAdmin });
  }
} 