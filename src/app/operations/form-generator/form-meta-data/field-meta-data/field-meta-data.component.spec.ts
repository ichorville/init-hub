import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldMetaDataComponent } from './field-meta-data.component';

describe('FieldMetaDataComponent', () => {
  let component: FieldMetaDataComponent;
  let fixture: ComponentFixture<FieldMetaDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldMetaDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
