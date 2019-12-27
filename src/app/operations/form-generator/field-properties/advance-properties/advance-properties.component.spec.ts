import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePropertiesComponent } from './advance-properties.component';

describe('AdvancePropertiesComponent', () => {
  let component: AdvancePropertiesComponent;
  let fixture: ComponentFixture<AdvancePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
