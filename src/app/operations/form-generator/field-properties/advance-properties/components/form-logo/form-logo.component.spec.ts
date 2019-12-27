import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLogoComponent } from './form-logo.component';

describe('FormLogoComponent', () => {
  let component: FormLogoComponent;
  let fixture: ComponentFixture<FormLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
