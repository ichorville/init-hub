import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddFieldComponent } from './form-add-field.component';

describe('FormAddFieldComponent', () => {
  let component: FormAddFieldComponent;
  let fixture: ComponentFixture<FormAddFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
