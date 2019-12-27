import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListMasterComponent } from './grid-list-master.component';

describe('GridListMasterComponent', () => {
  let component: GridListMasterComponent;
  let fixture: ComponentFixture<GridListMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridListMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridListMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
