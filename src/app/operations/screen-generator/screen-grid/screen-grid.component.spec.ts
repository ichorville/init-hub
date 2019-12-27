import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenGridComponent } from './screen-grid.component';

describe('ScreenGridComponent', () => {
  let component: ScreenGridComponent;
  let fixture: ComponentFixture<ScreenGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
