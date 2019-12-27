import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenGeneratorComponent } from './screen-generator.component';

describe('ScreenGeneratorComponent', () => {
  let component: ScreenGeneratorComponent;
  let fixture: ComponentFixture<ScreenGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
