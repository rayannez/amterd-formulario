import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSection } from './form-section';

describe('FormSection', () => {
  let component: FormSection;
  let fixture: ComponentFixture<FormSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSection],
    }).compileComponents();

    fixture = TestBed.createComponent(FormSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
