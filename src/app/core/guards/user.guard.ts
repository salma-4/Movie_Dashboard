import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role'); 
    if (role === 'ROLE_USER') {
      return true;
    } else {
      this.router.navigate(['/admin-dashboard']); // Redirect non-user admins
      return false; 
    }
  }
}