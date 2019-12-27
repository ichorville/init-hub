import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionResourcesComponent } from './option-resources.component';

describe('OptionResourcesComponent', () => {
  let component: OptionResourcesComponent;
  let fixture: ComponentFixture<OptionResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
