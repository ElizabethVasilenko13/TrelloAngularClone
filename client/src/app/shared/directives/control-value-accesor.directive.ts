import { DestroyRef, Directive, Inject, Injector, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, startWith, tap } from 'rxjs';

@Directive({
  selector: '[appControlValueAccesor]',
  standalone: true
})
export class ControlValueAccesorDirective<T> implements ControlValueAccessor, OnInit {
  control: FormControl | undefined;
  isRequired = false;

  private _isDisabled = false;
  private _onTouched!: () => T;

  constructor(
    @Inject(Injector) private injector: Injector,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  setFormControl(): void {
    try {
      const control = this.injector.get(NgControl);

      switch (control.constructor) {
        case FormControlName:
          this.control = this.injector
            .get(FormGroupDirective)
            .getControl(control as FormControlName);
          break;
        default:
          this.control = (control as FormControlDirective).form as FormControl;
          break;
      }
    } catch (err) {
      this.control = new FormControl();
    }
  }

  writeValue(value: T): void {
    this.control ? this.control.setValue(value) : (this.control = new FormControl(value));
  }

  registerOnChange(fn: (val: T | null) => T): void {
    this.control?.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(this.control.value),
        distinctUntilChanged(),
        tap((val) => fn(val))
      )
      .subscribe(() => this.control?.markAsUntouched());
  }

  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  protected isValid(): boolean {
    if (!this.control) {
      return true;
    }
    if (!this.control.touched) {
      return true;
    }
    return this.control.valid && (this.control.dirty || this.control.touched);
  }
}
