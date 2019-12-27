import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTreeComponent } from './setup-tree.component';

describe('SetupTreeComponent', () => {
  let component: SetupTreeComponent;
  let fixture: ComponentFixture<SetupTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
