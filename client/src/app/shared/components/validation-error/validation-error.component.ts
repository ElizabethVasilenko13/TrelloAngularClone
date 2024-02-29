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
  @Input() customErrorMessages: Record<string, string> = {};
  errorMessages: Record<string, string> = {};
  @Input() control: AbstractControl | null = null;
  @Input() controlName = '';

  setErrorName(): void {
    const controlName = this.controlName || 'field';
    if (this.control?.errors) {
      Object.entries(this.control.errors).forEach(([key, message]) => {
        let errorMessage: string;
        // Check if there is a custom error message for the current error key
        if (this.customErrorMessages && this.customErrorMessages[key]) {
          errorMessage = this.customErrorMessages[key];
        } else {
          // If no custom error message, use the default error message
          errorMessage = DEFAULT_ERROR_MESSAGES[key];
          // Special handling for pattern error
          if (key === 'pattern') {
            if (this.controlName === 'password') {
              errorMessage = DEFAULT_ERROR_MESSAGES['password'];
            } else if (this.controlName === 'name') {
              errorMessage = DEFAULT_ERROR_MESSAGES['name'];
            }
          }
        }
        // Replace placeholders in the error message
        errorMessage = errorMessage
          .replace('{{controlName}}', controlName)
          .replace('{{requiredLength}}', message?.requiredLength || '');
        // Store the error message
        this.errorMessages[key] = errorMessage;
      });
    }
  }

  ngOnChanges(): void {
    this.setErrorName();
  }
}
