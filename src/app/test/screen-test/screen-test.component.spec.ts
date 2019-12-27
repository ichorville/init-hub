import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTestComponent } from './screen-test.component';

describe('ScreenTestComponent', () => {
  let component: ScreenTestComponent;
  let fixture: ComponentFixture<ScreenTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
