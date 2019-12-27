import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleListMasterComponent } from './module-list-master.component';

describe('ModuleListMasterComponent', () => {
  let component: ModuleListMasterComponent;
  let fixture: ComponentFixture<ModuleListMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleListMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleListMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
