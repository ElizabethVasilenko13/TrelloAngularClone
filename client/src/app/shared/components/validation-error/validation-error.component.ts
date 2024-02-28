import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { DEFAULT_ERROR_MESSAGES } from '@shared/models/error-input.interface';

@Component({
  selector: 'app-validation-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss']
})
export class ValidationErrorComponent implements OnChanges {
  @Input() errors: Record<string, ValidationErrors> | null = {};
  errorMessages: Record<string, string> = {};

  @Input() control: AbstractControl | null = null;
  @Input() controlName = '';

  setErrorName(): void {
    const controlName = this.controlName || 'field';
    if (this.control?.errors) {
      Object.entries(this.control.errors).forEach(([key, message]) => {
        let errorMessage = DEFAULT_ERROR_MESSAGES[key];
        if (key === 'pattern') {
          if (this.controlName === 'password') {
            errorMessage = DEFAULT_ERROR_MESSAGES['password'];
          } else if (this.controlName === 'name') {
            errorMessage = DEFAULT_ERROR_MESSAGES['name'];
          }
        }
        this.errorMessages[key] = errorMessage
          .replace('{{controlName}}', controlName)
          .replace('{{requiredLength}}', message?.requiredLength || '');
      });
    }
  }

  ngOnChanges(): void {
    this.setErrorName();
  }
}
