import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegistrationResponse } from '../../model/registeration-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/dashboard-api/v1/auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.apiUrl}/signup`, userData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          alert("Email already exist ")
          return throwError(() => new Error('Email already exists. Please use a different email.'));
        } else {
          return throwError(() => new Error('Registration failed. Please try again.'));
        }
      })
    );
  }


  login(userData:any):Observable<RegistrationResponse>{
    return this.http.post<RegistrationResponse>(`${this.apiUrl}/login`, userData);
  }
}