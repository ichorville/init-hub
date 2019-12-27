import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldListMasterComponent } from './field-list-master.component';

describe('FieldListMasterComponent', () => {
  let component: FieldListMasterComponent;
  let fixture: ComponentFixture<FieldListMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldListMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldListMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
