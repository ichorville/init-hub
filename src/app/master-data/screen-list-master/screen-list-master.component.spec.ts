import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenListMasterComponent } from './screen-list-master.component';

describe('ScreenListMasterComponent', () => {
  let component: ScreenListMasterComponent;
  let fixture: ComponentFixture<ScreenListMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenListMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenListMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
