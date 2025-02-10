import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role'); // Get the user's role
    if (role === 'ROLE_ADMIN') {
      return true; // Allow access to the admin dashboard
    } else {
      this.router.navigate(['/user-dashboard']); // Redirect non-admin users
      return false; // Block access
    }
  }
}