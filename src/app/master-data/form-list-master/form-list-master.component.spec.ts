import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListMasterComponent } from './form-list-master.component';

describe('FormListMasterComponent', () => {
  let component: FormListMasterComponent;
  let fixture: ComponentFixture<FormListMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormListMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormListMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
