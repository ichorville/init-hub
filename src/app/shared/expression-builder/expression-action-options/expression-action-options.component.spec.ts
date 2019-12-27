import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionActionOptionsComponent } from './expression-action-options.component';

describe('ExpressionActionOptionsComponent', () => {
  let component: ExpressionActionOptionsComponent;
  let fixture: ComponentFixture<ExpressionActionOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionActionOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionActionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
