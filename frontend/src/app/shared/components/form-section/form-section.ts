import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.html',
  styleUrl: './form-section.scss'
})
export class FormSectionComponent {

  readonly title = input.required<string>();

}