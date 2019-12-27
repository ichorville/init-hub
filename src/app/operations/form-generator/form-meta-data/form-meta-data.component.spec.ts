import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMetaDataComponent } from './form-meta-data.component';

describe('FormMetaDataComponent', () => {
  let component: FormMetaDataComponent;
  let fixture: ComponentFixture<FormMetaDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMetaDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
