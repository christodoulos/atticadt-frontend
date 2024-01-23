import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbTooltipModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input() label = 'Select Something';
  @Input() showLabel = false;
  @Input() tooltip = 'Select Something';
  @Input() prompt = '';
  @Input() selections: { key: string; value: string }[] = [];
  @Input() hasNull = false;
  @Input() formControlName = '';
  @ViewChild(FormControlDirective) formControlDirective:
    | FormControlDirective
    | undefined;
  formControl!: FormControl;
  get control() {
    return (
      this.formControl ||
      this.controlContainer.control?.get(this.formControlName)
    );
  }

  constructor(private controlContainer: ControlContainer) {
    this.control?.setValue(this.selections[0].key);
  }

  ngOnInit() {
    if (this.selections && this.selections.length > 0) {
      this.control?.setValue(this.selections[0].key);
    }
  }

  onChange(event: any) {
    if (!event.target.options.selectedIndex)
      this.control.setErrors({ required: true });
  }

  getError(control: FormControl) {
    // return this.service.getError(control);
    return '';
  }

  writeValue(obj: any): void {
    if (this.formControlDirective?.valueAccessor) {
      this.formControlDirective.valueAccessor.writeValue(obj);
    }
  }

  registerOnChange(fn: any): void {
    if (this.formControlDirective?.valueAccessor) {
      this.formControlDirective.valueAccessor.registerOnChange(fn);
    }
  }

  registerOnTouched(fn: any): void {
    if (this.formControlDirective?.valueAccessor) {
      this.formControlDirective.valueAccessor.registerOnTouched(fn);
    }
  }
}
