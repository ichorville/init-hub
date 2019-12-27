import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceBindingsComponent } from './resource-bindings.component';

describe('ResourceBindingsComponent', () => {
  let component: ResourceBindingsComponent;
  let fixture: ComponentFixture<ResourceBindingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceBindingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceBindingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
