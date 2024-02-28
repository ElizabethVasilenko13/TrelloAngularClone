import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@shared/components/input/input.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);

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

  onSubmit(): void {
    const userData = this.registrationForm.value;
    console.log(userData);
    this.registrationForm.reset();
  }

  // onSubmit() {
  //   if (!this.formRegister.valid) return;
  //   this.loginService.onSubmit(this.formRegister);
  // }
}
