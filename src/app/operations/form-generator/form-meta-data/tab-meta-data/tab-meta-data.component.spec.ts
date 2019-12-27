import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMetaDataComponent } from './tab-meta-data.component';

describe('TabMetaDataComponent', () => {
  let component: TabMetaDataComponent;
  let fixture: ComponentFixture<TabMetaDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMetaDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
