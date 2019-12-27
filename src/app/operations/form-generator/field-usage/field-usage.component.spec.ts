import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldUsageComponent } from './field-usage.component';

describe('FieldUsageComponent', () => {
  let component: FieldUsageComponent;
  let fixture: ComponentFixture<FieldUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
