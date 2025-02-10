import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegistrationResponse } from '../../../model/registeration-response.model';
import { faTruckMedical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registeration',
  standalone:true,
  imports:[ReactiveFormsModule],
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss'],
})
export class RegisterationComponent {
  form: FormGroup;
  errorMessage: string | null = null; // To display error messages

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      role: ['ROLE_USER', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  onSubmit() {
    if (this.form.valid) {
      const userData = this.form.value;
      delete userData.confirmPassword; 
      this.authService.register(userData).subscribe({
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
            this.errorMessage = error.message; // Display email exists error
          } else {
            this.errorMessage = 'Registration failed. Please try again.'; // Display generic error
          }
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
