import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxField } from './checkbox-field';

describe('CheckboxField', () => {
  let component: CheckboxField;
  let fixture: ComponentFixture<CheckboxField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxField],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
