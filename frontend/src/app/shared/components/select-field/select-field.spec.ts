import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectField } from './select-field';

describe('SelectField', () => {
  let component: SelectField;
  let fixture: ComponentFixture<SelectField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectField],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
