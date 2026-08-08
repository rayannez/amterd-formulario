import { Component} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { BaseFieldComponent } from '../../base/base-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-checkbox-field',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  templateUrl: './checkbox-field.html',
  styleUrl: './checkbox-field.scss'
})
export class CheckboxFieldComponent extends BaseFieldComponent {}