import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SelectOption } from '../../interfaces/select-option.interface';
import { BaseFieldComponent } from '../../base/base-field.component';

@Component({
  selector: 'app-select-field',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './select-field.html'
})
export class SelectFieldComponent extends BaseFieldComponent{

  readonly options = input.required<ReadonlyArray<SelectOption>>();
  readonly readonly = input(false);

}