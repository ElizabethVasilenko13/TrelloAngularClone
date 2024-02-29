import { Directive, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  Validators
} from '@angular/forms';
import { Subject, distinctUntilChanged, startWith, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[appControlValueAccesor]',
  standalone: true
})
export class ControlValueAccesorDirective<T> implements ControlValueAccessor, OnInit, OnDestroy {
  control: FormControl | undefined;
  isRequired = false;

  private _isDisabled = false;
  private _onTouched!: () => T;
  private _destroy$ = new Subject<void>();

  constructor(@Inject(Injector) private injector: Injector) {}

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
    if (this.control && this.control.value !== value) {
      this.control.setValue(value);
    } else if (!this.control) {
      this.control = new FormControl(value);
    }
  }

  registerOnChange(fn: (val: T | null) => T): void {
    this.control?.valueChanges
      .pipe(
        takeUntil(this._destroy$),
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

  protected isInValid(): boolean {
    if (!this.control) {
      return false;
    }
    if (!this.control.touched) {
      return false;
    }

    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
