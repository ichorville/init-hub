import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMetaDataComponent } from './grid-meta-data.component';

describe('GridMetaDataComponent', () => {
  let component: GridMetaDataComponent;
  let fixture: ComponentFixture<GridMetaDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridMetaDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
