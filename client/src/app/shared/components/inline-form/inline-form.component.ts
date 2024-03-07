import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

type InputType = 'input' | 'textarea';

@Component({
  selector: 'app-inline-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inline-form.component.html'
})
export class InlineFormComponent {
  private fb = inject(FormBuilder);

  @Input() title = '';
  @Input() defaultText = 'Not defined';
  @Input() hasButton = false;
  @Input() buttonText = 'Sumbit';
  @Input() inputPlaceholder = '';
  @Input() inputType: InputType = 'input';

  @Output() handleSubmit = new EventEmitter<string>();

  isEditingMode = false;

  form = this.fb.group({
    title: ['']
  });

  activateEditing(): void {
    if (this.title) {
      this.form.patchValue({ title: this.title });
    }

    this.isEditingMode = true;
  }

  onSubmit(): void {
    if (this.form.value.title) {
      this.handleSubmit.emit(this.form.value.title);
    }
    this.isEditingMode = false;
    this.form.reset();
  }
}
