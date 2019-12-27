import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPropertiesComponent } from './general-properties.component';

describe('GeneralPropertiesComponent', () => {
  let component: GeneralPropertiesComponent;
  let fixture: ComponentFixture<GeneralPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
