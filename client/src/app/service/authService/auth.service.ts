import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http
      .post<{ access_token: string; user: string }>(
        'http://localhost:8000/login',
        data
      )
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', JSON.stringify(res.user));
        })
      );
  }

  signup(data: { name: string; email: string; password: string }) {
    return this.http
      .post<{ access_token: string; user: string }>(
        'http://localhost:8000/signup',
        data
      )
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', JSON.stringify(res.user));
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedin(): boolean {
    return !!this.getToken();
  }

  getName(): string | null {
    const user = localStorage.getItem('user');
    console.log(user);
    return user ? JSON.parse(user).name : null;
  }
}
