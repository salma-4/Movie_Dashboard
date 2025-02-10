import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { RegistrationResponse } from '../../../model/registeration-response.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 form: FormGroup;
  errorMessage: string | null = null; // To display error messages

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
     
    }
  );
  }

  onSubmit() {
    if (this.form.valid) {
      const userData = this.form.value;
      delete userData.confirmPassword; // Remove confirmPassword before sending to the API

      this.authService.login(userData).subscribe({
        next: (response: RegistrationResponse) => {
          console.log('Registration successful', response);
          localStorage.setItem('token', response.jwt);
          localStorage.setItem('role', response.role);

          if (response.role === 'ROLE_ADMIN') {
            this.router.navigate(['admin/admin-dashboard/allMovies']);
          } else {
            this.router.navigate(['user-dashboard']);
          }
        },
        error: (error :any) => {
          console.error('Registration failed', error);
          if (error.message === 'Email already exists. Please use a different email.') {
            this.errorMessage = error.message; 
          } else {
            this.errorMessage = 'Registration failed. Please try again.'; 
          }
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
