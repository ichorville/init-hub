import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenPreSaveComponent } from './screen-pre-save.component';

describe('ScreenPreSaveComponent', () => {
  let component: ScreenPreSaveComponent;
  let fixture: ComponentFixture<ScreenPreSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenPreSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenPreSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
