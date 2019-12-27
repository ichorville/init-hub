import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridGeneratorComponent } from './grid-generator.component';

describe('GridGeneratorComponent', () => {
  let component: GridGeneratorComponent;
  let fixture: ComponentFixture<GridGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
