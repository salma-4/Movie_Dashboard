import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8081/dashboard-api/v1/auth'; 
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  // Login user
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token); // Store JWT token
      })
    );
  }

  // Register user
  register(name: string, email: string, password: string, role: 'ROLE_USER' | 'ROLE_ADMIN'): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, role });
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  // Get user role from JWT token
  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded = this.jwtHelper.decodeToken(token);
    return decoded.role;
  }

}