import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccesorDirective } from '@shared/directives/control-value-accesor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ValidationErrorComponent],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent<T> extends ControlValueAccesorDirective<T> {
  @Input() inputId = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() formControlName = '';
  @Input() customErrorMessages: Record<string, string> = {};
}
