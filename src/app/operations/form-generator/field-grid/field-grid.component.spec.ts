import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldGridComponent } from './field-grid.component';

describe('FieldGridComponent', () => {
  let component: FieldGridComponent;
  let fixture: ComponentFixture<FieldGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
