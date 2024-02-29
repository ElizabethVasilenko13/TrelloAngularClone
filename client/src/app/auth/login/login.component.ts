import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@shared/components/input/input.component';
import { AuthApiService } from '../services/auth-api.service';
import { LoginRequestInterface } from '../models/auth.requests.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  protected authService = inject(AuthApiService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/)
      ]
    ]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    const userData = this.loginForm.value as LoginRequestInterface;
    this.authService.onLoginFormSubmit(userData);
    this.loginForm.reset();
    this.loginForm.setErrors(null);
  }
}
