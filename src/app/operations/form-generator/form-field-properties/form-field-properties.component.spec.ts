import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldPropertiesComponent } from './form-field-properties.component';

describe('FormFieldPropertiesComponent', () => {
  let component: FormFieldPropertiesComponent;
  let fixture: ComponentFixture<FormFieldPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
