import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@shared/components/input/input.component';
import { AuthApiService } from '../services/auth-api.service';
import { RegisterRequestInterface } from '../models/auth.requests.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  protected authService = inject(AuthApiService);

  registrationForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s]+$/)]
    ],
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

  ngOnInit(): void {
    this.authService.backendErrors$.next(null);
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) return;
    const userData = this.registrationForm.value as RegisterRequestInterface;
    this.authService.onRegisterFormSubmit(userData);
    this.registrationForm.reset();
    this.registrationForm.setErrors(null);
  }
}
